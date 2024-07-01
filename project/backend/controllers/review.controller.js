import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { createReviewValidator } from '../validators/review.validator.js';
import { createEventReview, getReviewByUserIdAndEventId, getReviewsByEventId } from '../services/review.service.js';
import { getEventById } from "../services/event.service.js";
import { checkIfUserHasTicket } from '../services/ticket.service.js';






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
            const isTicketBuyed = await checkIfUserHasTicket(req.user._id, req.body.eventId);

            // console.log(isTicketBuyed)

            if(isTicketBuyed === null){
                return next(new ErrorHandler("You have not bought ticket for this event", 400));
            }

            if(event.status == "upcoming"){
                return next(new ErrorHandler("You cannot Create a Review for an Upcoming Event", 400));
            }

            // check if user has already reviewed this event
            const isAlreadyReviewed = await getReviewByUserIdAndEventId(req.user._id, req.body.eventId);

            // console.log(isAlreadyReviewed)

            if(isAlreadyReviewed !== null){
                return next(new ErrorHandler("You have already reviewed this event", 400));
            }

            const reviewData = {
                ...req.body,
                event: req.body.eventId,
                user: req.user._id
            }

            // console.log(reviewData)

            const review = await createEventReview(reviewData);
            
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



// get event reviews
export const getReviews = CatchAsyncError(
    async (req, res, next) => {
        try {

            const event = await getEventById(req.params.id);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            const {page, limit, rating} = req.query;

            const options = {
                eventId: req.params.id,
                page: page || "1",
                limit: limit || "5",
                rating: rating || null
            }

            options.page = parseInt(options.page);
            options.limit = parseInt(options.limit);
            if(rating !== null){
                options.rating = parseInt(options.rating);
            }

            console.log(options)

            const reviews = await getReviewsByEventId(options)

            return res.status(201).json({
                success: true,
                message: "Reviews get successfully",
                data:{
                    ...reviews
                },
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);