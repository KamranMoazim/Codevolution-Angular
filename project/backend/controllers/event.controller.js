import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    createEvent, 
    getAllEvents, 
    updateEvent, 
    getEventById, 
    getEventsByUserId, 
    getEventsAvailableTickets, 
    getPersonsWhoBoughtTicket,
    getTopEvents
} from "../services/event.service.js";
import { createEventValidator, updateEventValidator } from '../validators/event.validator.js';
import { getReviewsByEventId } from '../services/review.service.js';







// create event
export const createEventController = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Event - CLEAN Architecture
            createEventValidator(req, next);

            const eventData = {
                ...req.body,
                organizer: req.user._id
            };

            const event = await createEvent(eventData);
            
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
export const updateEventController = CatchAsyncError(
    async (req, res, next) => {
        try {

            req.body.id = req.params.id;

            if(!req.body.id){
                return next(new ErrorHandler("Event Id is required", 400));
            }

            const eventExists = await getEventById(req.body.id);
            if(!eventExists){
                return next(new ErrorHandler("Event not found", 400));
            }

            // ! apply validation on Event - CLEAN Architecture
            updateEventValidator(req);

            // you have to add further validations here (business validations)
            // like only who created event can update it

            const event = await updateEvent(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Event updated successfully"
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// you have to improve the below function like pagination, searching, sorting
export const getAllEventsController = CatchAsyncError(
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
export const getEventsByUserIdController = CatchAsyncError(
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
export const getEventController = CatchAsyncError(
    async (req, res, next) => {
        try {
            const event = await getEventById(req.params.id);

            // console.log(event)

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            const ticketsAvailable = await getEventsAvailableTickets(req.params.id);
            const eventReviews = await getReviewsByEventId(req.params.id);
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


// get list of persons who have bought ticket for an event
export const getPersonsWhoBoughtTicketController = CatchAsyncError(
    async (req, res, next) => {
        try {

            // check if event exists
            const eventExists = await getEventById(req.params.id);
            if(!eventExists){
                return next(new ErrorHandler("Event not found", 400));
            }

            const persons = await getPersonsWhoBoughtTicket(req.params.id);
            return res.status(200).json({
                success: true,
                data:{
                    persons
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// get top events to show on home page
export const getTopEventsController = CatchAsyncError(
    async (req, res, next) => {
        try {
            const events = await getTopEvents();
            // console.log(events)
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