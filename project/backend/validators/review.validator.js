export const createReviewValidator = (req, next) => {

    // ceventId, userId, rating, comment should not be empty
    if(req.body.eventId === "" || req.body.userId === "" || req.body.rating === "" || req.body.comment === ""){
        return next(new ErrorHandler("eventId, userId, rating, comment should not be empty", 400));
    }

    // rating should be between 1 to 5
    if(req.body.rating < 1 || req.body.rating > 5){
        return next(new ErrorHandler("Rating should be between 1 to 5", 400));
    }
}
