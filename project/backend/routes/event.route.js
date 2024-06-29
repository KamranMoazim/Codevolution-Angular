import express from "express";
import {
    createEventController, 
    getEventController, 
    fetchEventsController,
    getEventsByUserIdController,
    getPersonsWhoBoughtTicketController,
    IsThisMyEventController
} from "../controllers/event.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { addingTempUser } from "../middlewares/temp.js";

const eventRouter = express.Router();


eventRouter.get("/event/:id", getEventController);
eventRouter.get("/is-my-event/:id", isAutheticated, IsThisMyEventController);
// eventRouter.get("/event", addingTempUser, fetchEventsController);
// eventRouter.post("/event", addingTempUser, createEventController);
eventRouter.get("/event", isAutheticated, fetchEventsController);
eventRouter.post("/event", isAutheticated, createEventController);



export default eventRouter;
