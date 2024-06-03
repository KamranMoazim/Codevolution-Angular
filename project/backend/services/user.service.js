// import { redis } from "../utils/redis";
import userModel from "../models/user.model.js";

// get user by id
export const getUserById = async (id, res) => {
    // const userJson = await redis.get(id);

    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user,
        });
    }
};

// Get All users
export const getAllUsersService = async (res) => {
    const users = await userModel.find().sort({ createdAt: -1 });

    res.status(201).json({
        success: true,
        users,
    });
};


export const getAllOrganisationsService = async (orgName, pageNo, pageSize) => {

    // const users = await userModel.find({ role: "admin" }).sort({ createdAt: -1 });

    // all admins are organisations 
    // return the average rating of the organisation and the number of events they have created
    // also apply limit and skip pagination

    const users = await userModel.aggregate([
        {
            // $match: { role: "admin" }
            $match: { role: "admin", name: { $regex: orgName, $options: "i" } }
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
    ]);

    // const users = await userModel.aggregate([
    //     {
    //         $match: { role: "admin" }
    //     },
    //     {
    //         $lookup: {
    //             from: "events",
    //             localField: "_id",
    //             foreignField: "user",
    //             as: "events"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "reviews",
    //             localField: "_id",
    //             foreignField: "user",
    //             as: "reviews"
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             name: 1,
    //             email: 1,
    //             profile: 1,
    //             followers: 1,
    //             events: 1,
    //             reviews: 1,
    //             averageRating: { $avg: "$reviews.rating" },
    //             totalEvents: { $size: "$events" }
    //         }
    //     },
    //     {
    //         $sort: { followers: -1 }
    //     }
    // ]);


    // const organisations = await userModel.aggregate([
    //     {
    //         $match: { role: "admin" }
    //     },
    //     {
    //         $lookup: {
    //             from: "events",
    //             localField: "_id",
    //             foreignField: "user",
    //             as: "events"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "reviews",
    //             localField: "_id",
    //             foreignField: "user",
    //             as: "reviews"
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             name: 1,
    //             email: 1,
    //             profile: 1,
    //             followers: 1,
    //             events: 1,
    //             reviews: 1,
    //             averageRating: { $avg: "$reviews.rating" },
    //             totalEvents: { $size: "$events" }
    //         }
    //     },
    //     {
    //         $sort: { followers: -1 }
    //     }
    // ]);


    // const users = await userModel.aggregate([
    //     {
    //         $match: { role: "admin" }
    //     },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "_id",
    //             foreignField: "followers",
    //             as: "followers"
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             name: 1,
    //             followersCount: { $size: "$followers" }
    //         }
    //     },
    //     {
    //         $sort: { followersCount: -1 }
    //     }
    // ]);
    

    // res.status(201).json({
    //     success: true,
    //     ,
    // });
    return users;
};
