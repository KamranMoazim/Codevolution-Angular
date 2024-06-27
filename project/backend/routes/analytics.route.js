import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import { addingTempUser } from "../middlewares/temp.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const analyticsRouter = express.Router();

analyticsRouter.get("/review/event/:id/", getReviews);
analyticsRouter.post("/review/event/", addingTempUser, createReview);

export default analyticsRouter;
