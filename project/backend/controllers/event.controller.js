import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    createEvent, 
    updateEvent, 
    getEventById, 
    getEventsByUserId, 
    getPersonsWhoBoughtTicket,
    fetchEvents
} from "../services/event.service.js";
import { createEventValidator, updateEventValidator } from '../validators/event.validator.js';
import mongoose from 'mongoose';







// create event
export const createEventController = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Event - CLEAN Architecture
            createEventValidator(req, next);

            console.log(req.body._id)

            // if(req.body._id && req.body._id !== "new"){
            if(req.body._id){
                const eventExists = await getEventById(req.body._id);
                if(!eventExists){
                    return next(new ErrorHandler("Event not found", 400));
                }

                const event = await updateEvent(req.body);
            
                return res.status(201).json({
                    success: true,
                    message: "Event updated successfully",
                    data:{
                        event
                    },
                });
            }

            

            const eventData = {
                ...req.body,
                // organizer: mongoose.Types.ObjectId.createFromHexString(req.user.id)
                organizer: req.user.id
            };

            delete eventData['_id'];
            // console.log(eventData)

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

            return res.status(200).json({
                success: true,
                message: "Event fetched successfully",
                data:{
                        event
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

            // console.log(eventExists)

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






export const fetchEventsController = CatchAsyncError(
    async (req, res, next) => {
        try {
            let {

                isUser = 'false',
                isOrganizer = 'false',
                organizer,

                search = '',
                page = 1,
                limit = 15,
                sortBy = 'date',
                sortOrder = 'asc',
                minPrice,
                maxPrice,
                status,
                startDate,
                endDate,
                startTime,
                endTime,
                minReviews,
                maxReviews
            } = req.query;

            console.log(req.query)

            isUser = isUser === 'true' ? true : false;
            isOrganizer = isOrganizer === 'true' ? true : false;

            const filters = {
                isUser,
                isOrganizer
            };

            if (isOrganizer || isUser) {
                if (!req.user || !req.user._id) {
                    return next(new ErrorHandler("You are not authorized to perform this action", 401));
                }
                filters.organizer = req.user._id; // means organizer is searching for his events
                filters.user = req.user._id; // means user is searching for events he has bought tickets for
            }

            // means someone is searching for events of a particular organizer
            if(organizer !== undefined && organizer !== ""){
                filters.organizer = organizer;
            }

            if (minPrice !== undefined && maxPrice !== undefined) {
                filters.ticketPrice = { min: Number(minPrice), max: Number(maxPrice) };
            }


            // if (startDate !== undefined) {
            //     filters.date = date;
            // }

            if(status !== undefined){
                filters.status = status
            }

            if(startDate !== undefined){
                filters.startDate = startDate
            }

            if(endDate !== undefined){
                filters.endDate = endDate
            }

            if (startTime !== undefined) {
                filters.startTime = Number(startTime);
            }

            if (endTime !== undefined) {
                filters.endTime = Number(endTime);
            }

            if (minReviews !== undefined && maxReviews !== undefined) {
                filters.reviews = { min: Number(minReviews), max: Number(maxReviews) };
            }

            const options = {
                search,
                page: Number(page),
                limit: Number(limit),
                sortBy,
                sortOrder,
                filters,
            };

            const events = await fetchEvents(options);

            return res.status(200).json({
                success: true,
                message: "Fetched events successfully",
                data: events
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);




export const IsThisMyEventController = CatchAsyncError(
    async (req, res, next) => {
        try {
            const event = await getEventById(req.params.id);
            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            if(event.organizer._id.toString() !== req.user._id.toString()){
                return next(new ErrorHandler("You are not authorized to perform this action", 401));
            }

            return res.status(200).json({
                success: true,
                message: "This is your event",
                data:{
                    isMyEvent: true
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);