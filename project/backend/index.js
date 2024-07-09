import 'dotenv/config'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cron from "node-cron";

import connectDB from "./utils/database.js";
import { ErrorMiddleware } from "./middlewares/error.js";

import authRoutes from "./routes/user.route.js";
import eventRoutes from "./routes/event.route.js";
import reviewRoutes from "./routes/review.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import eventModel from './models/event.model.js';


const app = express();
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    credentials: true,
    // include: ['http://localhost:4200']
}))

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URL || '';
await connectDB(dbUrl);


app.get("/api/v1/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Event Management API",
        data: {
            name: "Event Management API",
            version: "1.0.0",
        },
    })
})

// Routes
app.use(
    "/api/v1",
    authRoutes,
    eventRoutes,
    reviewRoutes,
    ticketRoutes,
    analyticsRoutes,
);

// unknown route
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});



cron.schedule('0 * * * *', async () => {
    try {
        const now = new Date();

        // Find events where date is in the past or today and end time is before current time
        const eventsToUpdate = await eventModel.find({
            $or: [
                { date: { $lt: now } },
                { date: now, endTime: { $lt: now.getHours() * 100 + now.getMinutes() } }
            ],
            status: { $ne: 'past' } // Exclude events already marked as 'past'
        });

        // Update status to 'past' for found events
        await Promise.all(eventsToUpdate.map(async (event) => {
            event.status = 'past';
            await event.save();
        }));

        console.log('Cron job executed successfully');
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});



app.listen(process.env.PORT | 5000, () => {
    console.log("Server is running on port " + (process.env.PORT | 5000))
})

app.use(ErrorMiddleware);