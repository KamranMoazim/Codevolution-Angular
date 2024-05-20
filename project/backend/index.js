import 'dotenv/config'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./utils/database.js";
import {ErrorMiddleware} from "./middlewares/error.js";

import authRoutes from "./routes/auth.route.js";


const app = express();
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
connectDB();


app.get("/", (req, res) => {
    res.send("Hello World")
})

// Routes
app.use(
    "/api/v1",
    authRoutes
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