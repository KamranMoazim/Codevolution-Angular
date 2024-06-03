import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const reviewRouter = express.Router();

reviewRouter.post("/review/event", createReview);
reviewRouter.post("/review/event/:id", getReviews);

export default reviewRouter;
