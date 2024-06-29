
import mongoose from "mongoose";
import reviewModel from "../models/review.model.js";
import eventModel from "../models/event.model.js";


// get review by id
export const getReviewByUserIdAndEventId = async (userId, eventId) => {
    const review = await reviewModel.findOne({ user: userId, event: eventId});
    return review;
};

// review event
export const createEventReview = async (reviewData) => {
    // console.log(reviewData)
    const review = await reviewModel.create(reviewData);

    // add review to event
    await eventModel.findByIdAndUpdate(reviewData.event,
        { $push: { reviews: review._id } },
        { new: true }
    );

    return review;
};

// get all reviews of an event
export const getReviewsByEventId = async (options) => {
    const { eventId, page, limit, rating } = options;

    const matchStage = {};

    if (rating) {
        matchStage.rating = rating;
    }


    matchStage.event = mongoose.Types.ObjectId.createFromHexString(eventId);

    const reviewPipeline = [
        {
            $match: matchStage
        },
        {
            $count: 'total'
        }
    ];

    const newPipeline = [
        {
            $match: matchStage
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                "user.password": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0,
                "user.__v": 0,
                "user.role": 0,
                "user._id": 0,
                "user.email": 0,
                "user.followers": 0,
                "user.tickets": 0,
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: limit * 1
        },
        {
            $skip: (page - 1) * limit
        }
    ];

    const reviews = await reviewModel.aggregate(newPipeline);

    const countReviews = await reviewModel.aggregate(reviewPipeline);

    return {
        reviews,
        total: countReviews.length ? countReviews[0].total : 0
    };
};

