import express from "express";
import { createReview } from "../controllers/review.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const reviewRouter = express.Router();

reviewRouter.post("/review/event", createReview);

export default reviewRouter;
