// import { redis } from "../utils/redis";
import reviewModel from "../models/review.model.js";


// get review by id
export const getReviewByUserId = async (userId) => {
    const review = await reviewModel.findOne({ user: userId });
    return review;
};

// review event
export const createEventReview = async (reviewData) => {
    // console.log(reviewData)
    const review = await reviewModel.create(reviewData);
    return review;
};

// get all reviews of an event
export const getReviewsByEventId = async (eventId) => {
    const reviews = await reviewModel.find({ event: eventId })
    // .sort({ createdAt: -1 });
    return reviews;
};

