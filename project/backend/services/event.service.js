// import { redis } from "../utils/redis";
import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";




// get event by id
export const getEventById = async (eventId) => {

    const event = await eventModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId.createFromHexString(eventId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "organizer",
                foreignField: "_id",
                as: "organizer"
            }
        },
        {
            $unwind: "$organizer"
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "event",
                as: "reviews"
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                date: 1,
                startTime: 1,
                endTime: 1,
                location: 1,
                organizer: 1,
                capacity: 1,
                category: 1,
                tickets: 1,
                reviews: 1,
                ticketPrice: 1,
                status: 1,
                media: 1,
                numberOfTicketsSold: 1,
            }
        }
    ]);

    return event[0];
};

// get all events created by particular user
export const getEventsByUserId = async (userId) => {

    const events = await eventModel.aggregate([
        {
            $match: { organizer: mongoose.Types.ObjectId.createFromHexString(userId) }
        },
        {
            $sort: { date: -1 }
        }
    ]);

    return events;
};

// create event
export const createEvent = async (event) => {
    const newEvent = await eventModel.create(event);
    return newEvent;
};

// update event
export const updateEvent = async (event) => {
    // const updateEvent = await eventModel.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(event._id) })
    const updateEvent = await eventModel.findOne({ _id: event._id })
        .updateOne(event);
    return updateEvent;
};




// get list of persons who have bought ticket for an event
export const getPersonsWhoBoughtTicket = async (eventId) => {

    console.log(eventId)

    const objEventId = mongoose.Types.ObjectId.createFromHexString(eventId);

    // use aggregate
    const tickets = await ticketModel.aggregate([
        {
            $match: { event: objEventId },
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
                _id: 0,
                user: 1
            }
        },
        {
            $replaceRoot: { newRoot: "$user" }
        },
        // {
        //     $lookup: {
        //         from: "profiles",
        //         localField: "profile",
        //         foreignField: "_id",
        //         as: "profile"
        //     }
        // },
        // {
        //     $project: {
        //         _id: 0,
        //         // password: 0,
        //         // role: 0,
        //         // tickets: 0,
        //         profile: 1
        //     }
        // },
        // {
        //     $unwind: "$profile"
        // },
        // {
        //     $replaceRoot: { newRoot: "$profile" }
        // },
    ]);
    // console.log(tickets)
    return tickets;
}





// get all events
export const fetchEvents = async ({ search = '', page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = {}) => {

    const matchStage = {};
    let userAttendedEvents = [];

    if (filters.isOrganizer) {
        matchStage.organizer = mongoose.Types.ObjectId.createFromHexString(filters.organizer);
    } else if (filters.isUser) {
        userAttendedEvents = await ticketModel.find({ user: mongoose.Types.ObjectId.createFromHexString(filters.user) });
        matchStage._id = { $in: userAttendedEvents.map(ticket => ticket.event) };
    }

    if (search) {
        matchStage.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
        ];
    }

    if (filters.ticketPrice) {
        matchStage.ticketPrice = { $gte: filters.ticketPrice.min, $lte: filters.ticketPrice.max };
    }

    if (filters.status) {
        matchStage.status = filters.status;
    }

    if (filters.startDate) {
        matchStage.startDate = filters.startDate;
    }

    if (filters.endDate) {
        matchStage.endDate = filters.endDate;
    }

    if (filters.startTime) {
        matchStage.startTime = { $gte: filters.startTime };
    }

    if (filters.endTime) {
        matchStage.endTime = { $lte: filters.endTime };
    }

    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

    const aggregationPipeline = [
        { $match: matchStage },
        // {
        //     $lookup: {
        //         from: 'reviews', // Name of the reviews collection
        //         localField: '_id',
        //         foreignField: 'event',
        //         as: 'reviews',
        //     },
        // },
        {
            $lookup: {
                from: 'users', // return User of the organizer
                localField: 'organizer',
                foreignField: '_id',
                as: 'organizer',
            },
        },
        {
            $unwind: '$organizer',
        },
        // {
        //     $addFields: {
        //         averageRating: { $avg: '$reviews.rating' }
        //     }
        // },
    ];
    // Add the rating filter
    // avg rating of the event should be greater than or equal to the min rating and less than or equal to the max rating
    // if (filters.reviews) {
    //     aggregationPipeline.push({
    //         $match: {
    //             averageRating: { $gte: filters.reviews.min, $lte: filters.reviews.max }
    //         }
    //     });
    // }


    const tempPipeline = [
        ...aggregationPipeline,
        {
            $count: 'total'
        }]

    aggregationPipeline.push(
        { $sort: { [sortBy]: sortOrderValue } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $project : {
                _id: 1,
                // name: 1,
                title: 1,
                description: 1,
                date: 1,
                startTime: 1,
                endTime: 1,
                location: 1,
                organizer: 1,
                capacity: 1,
                category: 1,
                // tickets: 1,
                // reviews: 1,
                ticketPrice: 1,
                status: 1,
                media: 1,
                averageRating: 1
            }
        }
    );

    const events = await eventModel.aggregate(aggregationPipeline);
    const totalEventsCount = await eventModel.aggregate(tempPipeline);


    // return events;
    return {
        events,
        page,
        // totalPages: Math.ceil(events.length / limit)
        totalPages: totalEventsCount.length != 0 ? totalEventsCount[0].total : 0
    }
};
