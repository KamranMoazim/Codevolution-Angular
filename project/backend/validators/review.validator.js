import ErrorHandler from "../utils/ErrorHandler.js";

export const createReviewValidator = (req, next) => {

    // ceventId, userId, rating, comment should not be empty
    if (req.body.eventId === "" || req.body.userId === "" || req.body.rating === "" || req.body.comment === "") {
        throw new ErrorHandler("eventId, userId, rating, comment should not be empty", 400);
    }

    // rating should be between 1 to 5
    if (req.body.rating < 1 || req.body.rating > 5) {
        throw new ErrorHandler("Rating should be between 1 to 5", 400);
    }

    // comment cannot be empty
    if (req.body.comment == undefined || req.body.comment == "" || req.body.comment.length == 0) {
        throw new ErrorHandler("Comment cannot be empty", 400);
    }
}


import Joi from "joi";


const reviewSchema = Joi.object({
    eventId: Joi.string().min(1).required().messages({
        'any.required': 'Event ID is required',
        'string.empty': 'Event ID should not be empty',
    }),
    userId: Joi.string().min(1).required().messages({
        'any.required': 'User ID is required',
        'string.empty': 'User ID should not be empty',
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
        'any.required': 'Rating is required',
        'number.base': 'Rating should be a number',
        'number.min': 'Rating should be at least 1',
        'number.max': 'Rating should be at most 5',
    }),
    comment: Joi.string().min(1).required().messages({
        'any.required': 'Comment is required',
        'string.empty': 'Comment should not be empty',
    }),
});


export const validateReviewSchema = async (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        throw new ErrorHandler(error.details[0].message, 400)
    }
}