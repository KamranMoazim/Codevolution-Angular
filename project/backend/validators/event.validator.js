export const createEventValidator = (req, next) => {

    // category , title, description, location should not be empty
    if(req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === ""){
        return next(new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400));
    }

    // date should be greater than current date
    if(req.body.date < new Date().getTime()){
        return next(new ErrorHandler("Date should be greater than current date", 400));
    }

    // start time or end time cannot be in past
    if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
        return next(new ErrorHandler("Start time or end time cannot be in past", 400));
    }

    // capacity should be greater than 0
    if(req.body.capacity <= 0){
        return next(new ErrorHandler("Capacity should be greater than 0", 400));
    }

    // status should be one of upcoming, ongoing, past, canceled
    if(req.body.status !== "upcoming" || req.body.status !== "ongoing" || req.body.status !== "past" || req.body.status !== "canceled"){
        return next(new ErrorHandler("Status should be one of upcoming, ongoing, past, canceled", 400));
    }
}



export const updateEventValidator = (req, next) => {

    // eventId is required
    if(!req.body.eventId){
        return next(new ErrorHandler("Event Id is required", 400));
    }

    // category , title, description, location should not be empty
    if(req.body.category === "" || req.body.title === "" || req.body.description === "" || req.body.location === "" || req.body.date === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.capacity === "" || req.body.status === "" || req.body.ticketPrice === ""){
        return next(new ErrorHandler("Category , title, description, location, date, start time, end time, capacity, status should not be empty", 400));
    }

    // date should be greater than current date
    if(req.body.date < new Date().getTime()){
        return next(new ErrorHandler("Date should be greater than current date", 400));
    }

    // start time or end time cannot be in past
    if(req.body.startTime < new Date().getTime() || req.body.endTime < new Date().getTime()){
        return next(new ErrorHandler("Start time or end time cannot be in past", 400));
    }

    // capacity should be greater than 0
    if(req.body.capacity <= 0){
        return next(new ErrorHandler("Capacity should be greater than 0", 400));
    }

    // status should be one of upcoming, ongoing, past, canceled
    if(req.body.status !== "upcoming" || req.body.status !== "ongoing" || req.body.status !== "past" || req.body.status !== "canceled"){
        return next(new ErrorHandler("Status should be one of upcoming, ongoing, past, canceled", 400));
    }

}