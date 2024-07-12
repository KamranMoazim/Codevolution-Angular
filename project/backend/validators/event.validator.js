import ErrorHandler from "../utils/ErrorHandler.js";

export const createEventValidator = (req) => {

    // check if body is empty
    if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler("Request body cannot be empty", 400);
    }

    // category , title, description, location should not be empty
    if (req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === "") {
        throw new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400);
    }

    // date should be greater than current date
    if (req.body.date < new Date().getTime()) {
        throw new ErrorHandler("Date should be greater than current date", 400);
    }

    // start time or end time cannot be in past
    // if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
    //     throw new ErrorHandler("Start time or end time cannot be in past", 400);
    // }
    if (req.body.startTime >= req.body.endTime) {
        throw new ErrorHandler("Start time or end time cannot be same or in past", 400);
    }

    // capacity should be greater than 0
    if (req.body.capacity <= 0) {
        throw new ErrorHandler("Capacity should be greater than 0", 400);
    }

    // ticket price should be greater than 0
    if (req.body.ticketPrice <= 0) {
        throw new ErrorHandler("Ticket price should be greater than 0", 400);
    }
}



export const updateEventValidator = (req) => {



    // eventId is required
    if (!req.body.id) {
        throw new ErrorHandler("Event Id is required", 400);
    }

    // category , title, description, location should not be empty
    if (req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === "") {
        throw new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400);
    }

    // date should be greater than current date
    if (req.body.date < new Date().getTime()) {
        throw new ErrorHandler("Date should be greater than current date", 400);
    }

    // start time or end time cannot be in past
    // if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
    //     throw new ErrorHandler("Start time or end time cannot be in past", 400);
    // }
    if (req.body.startTime < req.body.endTime) {
        throw new ErrorHandler("Start time or end time cannot be same or in past", 400);
    }

    // capacity should be greater than 0
    if (req.body.capacity <= 0) {
        throw new ErrorHandler("Capacity should be greater than 0", 400);
    }

    // // status should be one of upcoming, ongoing, past, canceled
    // if(req.body.status !== "upcoming" || req.body.status !== "ongoing" || req.body.status !== "past" || req.body.status !== "canceled"){
    //     throw new ErrorHandler("Status should be one of upcoming, ongoing, past, canceled", 400);
    // }

}









// const Joi = require('joi');
import Joi from 'joi';

const eventSchema = Joi.object({
    category: Joi.string().min(1).required().messages({
        'any.required': 'Category is required',
        'string.empty': 'Category should not be empty',
    }),
    title: Joi.string().min(1).required().messages({
        'any.required': 'Title is required',
        'string.empty': 'Title should not be empty',
    }),
    description: Joi.string().min(1).required().messages({
        'any.required': 'Description is required',
        'string.empty': 'Description should not be empty',
    }),
    location: Joi.string().min(1).required().messages({
        'any.required': 'Location is required',
        'string.empty': 'Location should not be empty',
    }),
    date: Joi.date().greater('now').iso().required().messages({
        'any.required': 'Date is required',
        'date.greater': 'Date should be greater than the current date',
        'date.format': 'Date should be in ISO format like 2021-12-31',
    }),
    capacity: Joi.number().integer().min(1).required().messages({
        'any.required': 'Capacity is required',
        'number.min': 'Capacity should be greater than 0',
    }),
    status: Joi.string().valid('upcoming', 'ongoing', 'past').required().messages({
        'any.required': 'Status is required',
        'any.only': 'Status must be one of the following: upcoming, ongoing, past',
    }),
    ticketPrice: Joi.number().min(0).max(200).required().messages({
        'any.required': 'Ticket price is required',
        'number.min': 'Ticket price should be greater than 0',
        'number.max': 'Ticket price should be less than 200',
    }),
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
}).custom((value, helpers) => {
    if (value.startTime >= value.endTime) {
        return helpers.message('Start time should be before end time');
    }
    return value;
});


export const validateEvent = async (req, res, next) => {
    const { error } = eventSchema.validate(req.body);

    if (error) {
        throw new ErrorHandler(error.details[0].message, 400)
    }
}