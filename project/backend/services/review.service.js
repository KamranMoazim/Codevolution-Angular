// import { redis } from "../utils/redis";
import reviewModel from "../models/review.model.js";
import eventModel from "../models/event.model.js";


// get review by id
export const getReviewByUserId = async (userId) => {
    const review = await reviewModel.findOne({ user: userId });
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
    // const reviews = await reviewModel.find({ event: eventId })
    //     .sort({ createdAt: -1 });

    const matchStage = {};

    if (rating) {
        matchStage.rating = rating;
    }


    // const reviews = await reviewModel.find({ event: mongoose.Types.ObjectId.createFromHexString(eventId) })
    //     .sort({ createdAt: -1 })
    //     .limit(limit * 1)
    //     .skip((page - 1) * limit)
    //     .exec();

    matchStage.event = eventId;

    const reviewPipeline = [
        {
            // $match: {
            //     event: eventId
            // }
            $match: matchStage
        },
        {
            $count: 'total'
        }
    ];

    const countReviews = await reviewModel.aggregate(reviewPipeline);

    const newPipeline = [
        ...reviewPipeline,
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
                "user.__v": 0
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

    return {
        reviews,
        total: countReviews.length ? countReviews[0]:0
    };
};

