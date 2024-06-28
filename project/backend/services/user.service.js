import userModel from "../models/user.model.js";


export const getAllOrganizationsService = async (search, pageNo, pageSize) => {

    // console.log(search, pageNo, pageSize)

    const stages = [
        {
            // $match: { role: "admin" }
            $match: { role: "admin", name: { $regex: search, $options: "i" } }
        },
        {
            $lookup: {
                from: "events",
                localField: "_id",
                foreignField: "user",
                as: "events"
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "user",
                as: "reviews"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                bio: 1,
                // profile: 1,
                // followers: 1,
                // events: 1,
                // reviews: 1,
                avatar: 1,
                averageRating: { $avg: "$reviews.rating" },
                totalEvents: { $size: "$events" }
            }
        },
        {
            $sort: { averageRating: 1 }
        },
        {
            $skip: pageSize * (pageNo - 1)
        },
        {
            $limit: pageSize
        }
    ];


    const totalCountStage = [
        {
            $match: { role: "admin", name: { $regex: search, $options: "i" } }
        },
        {
            $count: "total"
        }
    ];

    const users = await userModel.aggregate(stages);

    const total = await userModel.aggregate(totalCountStage);

    return {
        organizations:users,
        total: total.length ? total[0].total : 0
    };
};
