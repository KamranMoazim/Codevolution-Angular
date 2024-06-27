import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import { addingTempUser } from "../middlewares/temp.js";
import { getLast30DaysTicketsBoughtAnalyticsController, eachStarCountAnalyticsController } from "../controllers/analytics.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const analyticsRouter = express.Router();



analyticsRouter.get("/analytics/event/:id/tickets/", addingTempUser, getLast30DaysTicketsBoughtAnalyticsController);
analyticsRouter.get("/analytics/event/:id/ratings/", addingTempUser, eachStarCountAnalyticsController);

export default analyticsRouter;
