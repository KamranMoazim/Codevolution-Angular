import ErrorHandler from "../utils/ErrorHandler.js";

export const createReviewValidator = (req, next) => {

    // ceventId, userId, rating, comment should not be empty
    if(req.body.eventId === "" || req.body.userId === "" || req.body.rating === "" || req.body.comment === ""){
        throw new ErrorHandler("eventId, userId, rating, comment should not be empty", 400);
    }

    // rating should be between 1 to 5
    if(req.body.rating < 1 || req.body.rating > 5){
        throw new ErrorHandler("Rating should be between 1 to 5", 400);
    }

    // comment cannot be empty
    if(req.body.comment.length == 0){
        throw new ErrorHandler("Comment cannot be empty", 400);
    }
}
