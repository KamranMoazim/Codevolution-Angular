import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    createEvent, getAllEvents, updateEvent, getEventById, 
    getEventsByUserId, getEventsByUser, getEventsSoldTickets, 
    getEventsAvailableTickets, getEventsByStatusOfParticularUser,
} from "../services/event.service.js";
import { eventValidator } from '../validators/event.validator.js';






// create event
export const createEvent = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Event - CLEAN Architecture
            eventValidator(req, next);

            const event = await createEvent(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                data:event,
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// update event
export const updateEvent = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Event - CLEAN Architecture
            eventValidator(req, next);

            const event = await updateEvent(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Event updated successfully",
                data:event,
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


