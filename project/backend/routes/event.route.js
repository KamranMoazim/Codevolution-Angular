import express from "express";
import {
    createEventController, 
    getEventController, 
    fetchEventsController,
    getEventsByUserIdController,
    getPersonsWhoBoughtTicketController
} from "../controllers/event.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { addingTempUser } from "../middlewares/temp.js";

const eventRouter = express.Router();


eventRouter.get("/event/:id", getEventController);
eventRouter.get("/event", addingTempUser, fetchEventsController);
eventRouter.post("/event", addingTempUser, createEventController);



export default eventRouter;
