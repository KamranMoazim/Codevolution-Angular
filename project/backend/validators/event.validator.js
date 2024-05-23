import ErrorHandler from "../utils/ErrorHandler.js";

export const createEventValidator = (req) => {

    // check if body is empty
    if(Object.keys(req.body).length === 0){
        throw new ErrorHandler("Request body cannot be empty", 400);
    }

    // category , title, description, location should not be empty
    if(req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === ""){
        throw new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400);
    }

    // date should be greater than current date
    if(req.body.date < new Date().getTime()){
        throw new ErrorHandler("Date should be greater than current date", 400);
    }

    // start time or end time cannot be in past
    if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
        throw new ErrorHandler("Start time or end time cannot be in past", 400);
    }

    // capacity should be greater than 0
    if(req.body.capacity <= 0){
        throw new ErrorHandler("Capacity should be greater than 0", 400);
    }

    // ticket price should be greater than 0
    if(req.body.ticketPrice <= 0){
        throw new ErrorHandler("Ticket price should be greater than 0", 400);
    }
}



export const updateEventValidator = (req) => {

    

    // eventId is required
    if(!req.body.id){
        throw new ErrorHandler("Event Id is required", 400);
    }

    // category , title, description, location should not be empty
    if(req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === ""){
        throw new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400);
    }

    // date should be greater than current date
    if(req.body.date < new Date().getTime()){
        throw new ErrorHandler("Date should be greater than current date", 400);
    }

    // start time or end time cannot be in past
    if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
        throw new ErrorHandler("Start time or end time cannot be in past", 400);
    }

    // capacity should be greater than 0
    if(req.body.capacity <= 0){
        throw new ErrorHandler("Capacity should be greater than 0", 400);
    }

    // // status should be one of upcoming, ongoing, past, canceled
    // if(req.body.status !== "upcoming" || req.body.status !== "ongoing" || req.body.status !== "past" || req.body.status !== "canceled"){
    //     throw new ErrorHandler("Status should be one of upcoming, ongoing, past, canceled", 400);
    // }

}