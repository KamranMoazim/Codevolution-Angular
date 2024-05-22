import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    createEvent, getAllEvents, updateEvent, getEventById, 
    getEventsByUserId, getEventsByUser, getEventsSoldTickets, 
    getEventsAvailableTickets, getEventsByStatusOfParticularUser,
} from "../services/event.service.js";
import { createEventValidator } from '../validators/event.validator.js';
import { getReviewsByEventId } from '../services/review.service.js';







// create event
export const createEvent = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Event - CLEAN Architecture
            createEventValidator(req, next);

            const event = await createEvent(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                data:{
                    event
                },
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

            if(!req.body.eventId){
                return next(new ErrorHandler("Event Id is required", 400));
            }

            const eventExists = await getEventById(req.body.eventId);
            if(!eventExists){
                return next(new ErrorHandler("Event not found", 400));
            }

            // ! apply validation on Event - CLEAN Architecture
            updateEventValidator(req, next);

            const event = await updateEvent(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Event updated successfully",
                data:{
                    event
                },
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// you have to improve the below function
export const getAllEvents = CatchAsyncError(
    async (req, res, next) => {
        try {
            const events = await getAllEvents("upcoming");
            return res.status(200).json({
                success: true,
                data:{
                    events
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// get all events user has created or get all events from particular user
export const getEventsByUserId = CatchAsyncError(
    async (req, res, next) => {
        try {
            const events = await getEventsByUserId(req.user.id);
            return res.status(200).json({
                success: true,
                data:{
                    events
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// get particular event
export const getEvent = CatchAsyncError(
    async (req, res, next) => {
        try {
            const event = await getEventById(req.params.eventId);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            const ticketsAvailable = await getEventsAvailableTickets(req.params.eventId);
            const eventReviews = await getReviewsByEventId(req.params.eventId);
            return res.status(200).json({
                success: true,
                data:{
                        event,
                        ticketsAvailable,
                        eventReviews
                    },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
