import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { createReviewValidator } from '../validators/review.validator.js';
import { createEventReview, getReviewByUserId } from '../services/review.service.js';
import { getEventById } from "../services/event.service.js";






// create review
export const createReview = CatchAsyncError(
    async (req, res, next) => {
        try {

            // ! apply validation on Review - CLEAN Architecture
            createReviewValidator(req, next);

            const event = await getEventById(req.body.eventId);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            // check if user has buyed ticket for this event
            const isTicketBuyed = event.tickets.find(
                ticket => ticket.userId.toString() === req.body.userId.toString()
            );

            if(!isTicketBuyed){
                return next(new ErrorHandler("You have not buyed ticket for this event", 400));
            }

            // check if user has already reviewed this event
            const isAlreadyReviewed = await getReviewByUserId(req.body.userId);

            if(isAlreadyReviewed){
                return next(new ErrorHandler("You have already reviewed this event", 400));
            }

            const review = await createEventReview(req.body);
            
            return res.status(201).json({
                success: true,
                message: "Reviewed event successfully",
                data:{
                    review
                },
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
