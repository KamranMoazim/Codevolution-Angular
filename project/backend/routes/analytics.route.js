import express from "express";
import { addingTempUser } from "../middlewares/temp.js";
import { 
    getLast30DaysTicketsBoughtAnalyticsController, 
    eachStarCountAnalyticsController, 
    numberOfEventsCreatedInLast12MonthsByUserController,
    allEventsByUserUniqueCategoriesByCountAnalyticsController,
    mostEventTimeOfDayController
} from "../controllers/analytics.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const analyticsRouter = express.Router();



analyticsRouter.get("/analytics/event/:id/tickets/", addingTempUser, getLast30DaysTicketsBoughtAnalyticsController);
analyticsRouter.get("/analytics/event/:id/ratings/", addingTempUser, eachStarCountAnalyticsController);
analyticsRouter.get("/analytics/events/event-count/", addingTempUser, numberOfEventsCreatedInLast12MonthsByUserController);
analyticsRouter.get("/analytics/events/categories/", addingTempUser, allEventsByUserUniqueCategoriesByCountAnalyticsController);
analyticsRouter.get("/analytics/events/times/", addingTempUser, mostEventTimeOfDayController);

export default analyticsRouter;
