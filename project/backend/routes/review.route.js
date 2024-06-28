import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import { addingTempUser } from "../middlewares/temp.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";

const reviewRouter = express.Router();

reviewRouter.get("/review/event/:id/", getReviews);
reviewRouter.post("/review/event/", addingTempUser, createReview);

export default reviewRouter;
