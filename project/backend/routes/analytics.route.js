import express from "express";
import { addingTempUser } from "../middlewares/temp.js";
import { 
    getLast30DaysTicketsBoughtAnalyticsController, 
    eachStarCountAnalyticsController, 
    numberOfEventsCreatedInLast12MonthsByUserController,
    allEventsByUserUniqueCategoriesByCountAnalyticsController,
    // mostEventTimeOfDayController,
    totalRevenueAnalyticsController,
    eachStarCountForAllEventsAnalyticsController
} from "../controllers/analytics.controller.js";
import { isAutheticated } from "../middlewares/auth.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const analyticsRouter = express.Router();



// analyticsRouter.get("/analytics/event/:id/tickets/", addingTempUser, getLast30DaysTicketsBoughtAnalyticsController);
// analyticsRouter.get("/analytics/event/:id/ratings/", addingTempUser, eachStarCountAnalyticsController);
// analyticsRouter.get("/analytics/events/event-count/", addingTempUser, numberOfEventsCreatedInLast12MonthsByUserController);
// analyticsRouter.get("/analytics/events/categories/", addingTempUser, allEventsByUserUniqueCategoriesByCountAnalyticsController);
// // analyticsRouter.get("/analytics/events/times/", addingTempUser, mostEventTimeOfDayController);
// analyticsRouter.get("/analytics/events/total-revenue/", addingTempUser, totalRevenueAnalyticsController);

analyticsRouter.get("/analytics/event/:id/tickets/", isAutheticated, getLast30DaysTicketsBoughtAnalyticsController);
analyticsRouter.get("/analytics/event/:id/ratings/", isAutheticated, eachStarCountAnalyticsController);
analyticsRouter.get("/analytics/events/event-count/", isAutheticated, numberOfEventsCreatedInLast12MonthsByUserController);
analyticsRouter.get("/analytics/events/categories/", isAutheticated, allEventsByUserUniqueCategoriesByCountAnalyticsController);
// analyticsRouter.get("/analytics/events/times/", addingTempUser, mostEventTimeOfDayController);
analyticsRouter.get("/analytics/events/total-revenue/", isAutheticated, totalRevenueAnalyticsController);
analyticsRouter.get("/analytics/events/each-star-ratings/", isAutheticated, eachStarCountForAllEventsAnalyticsController);

export default analyticsRouter;
