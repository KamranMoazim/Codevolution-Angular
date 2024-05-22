// import { redis } from "../utils/redis";
import reviewModel from "../models/review.model.js";


// get review by id
export const getReviewById = async (reviewId) => {
    const review = await reviewModel.findById(reviewId);
    return review;
};

// review event
export const createEventReview = async (reviewData) => {
    const review = await reviewModel.create(reviewData);
    return review;
};

// get all reviews of an event
export const getReviewsByEventId = async (eventId) => {
    const reviews = await reviewModel.find({ event: eventId })
    // .sort({ createdAt: -1 });
    return reviews;
};

