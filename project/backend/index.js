import 'dotenv/config'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./utils/database.js";
import {ErrorMiddleware} from "./middlewares/error.js";

import authRoutes from "./routes/user.route.js";
import eventRoutes from "./routes/event.route.js";
import reviewRoutes from "./routes/review.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import profileRoutes from "./routes/profile.route.js";



const app = express();
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
connectDB();


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
    profileRoutes,
);

// unknown route
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});






app.listen(process.env.PORT | 5000, () => {
    console.log("Server is running on port " + (process.env.PORT|5000))
})

app.use(ErrorMiddleware);