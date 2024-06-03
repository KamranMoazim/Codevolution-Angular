// import { redis } from "../utils/redis";
import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";



// get all events
export const getAllEvents = async (status) => {
    const events = await eventModel.find({
        status,
        date: { $gte: new Date() }
    })
        .sort({ date: -1 });
    return events;
};

// get event by id
export const getEventById = async (eventId) => {
    // console.log(eventId)
    // const event = await eventModel.findById(eventId).populate("organizer").populate("reviews").exec();
    // return event;

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
                name: 1,
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
                media: 1
            }
        }
    ]);

    return event[0];
};

// get all events particular user has created
export const getEventsByUserId = async (userId) => {
    // const events = await eventModel.find({ organizer: userId })
    //                                 .sort({ date: -1 });
    // return events;

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
    const updateEvent = await eventModel.findOne({ _id: event.id })
        .updateOne(event);
    return updateEvent;
};



// get number of tickets sold for an event -- capacity property
export const getEventsSoldTickets = async (eventId) => {
    const event = await eventModel.findById(eventId);
    return event.tickets.length;
};

// get number of tickets available for an event
export const getEventsAvailableTickets = async (eventId) => {
    // const event = await eventModel.findById(eventId);
    // return event.capacity - event.tickets.length;

    // using aggregate
    const tickets = await ticketModel.aggregate([
        {
            $match: { event: eventId }
        },
        {
            $group: {
                _id: "$event",
                totalTicketsSold: { $sum: 1 }
            }
        }
    ]);
    return tickets;
}

// get particular status events of particular user
export const getEventsByStatusOfParticularUser = async (userId, status) => {
    // const events = await eventModel.find({ organizer: userId, status }).sort({ date: -1 });;
    // return events;

    // using aggregate
    const events = await eventModel.aggregate([
        {
            $match: { organizer: userId, status }
        },
        {
            $sort: { date: -1 }
        }
    ]);
    return events;
};

// get list of persons who have bought ticket for an event
export const getPersonsWhoBoughtTicket = async (eventId) => {
    // const event = await eventModel.findById(eventId).populate("tickets");
    // const tickets = event.tickets;
    // const users = [];
    // for (let i = 0; i < tickets.length; i++) {
    //     // console.log(tickets[i])
    //     const user = await ticketModel.findById(tickets[i]).populate("user").select("user -_id");
    //     users.push(user.get("user"));
    // }
    // return users;

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

// get top 15 events with most tickets sold along with their reviews 
export const getTopEvents = async () => {
    // const events = await eventModel.find()
    //                                 .sort({ tickets: -1 })
    //                                 .limit(15);



    const events = await eventModel.aggregate([
        {
            $match: { status: "past" }
        },
        {
            $project: {
                name: 1,
                // tickets: 1,
                // reviews: 1,
                // organizer: 1,
                media: 1,
                date: 1,
                status: 1,
                capacity: 1,
                ticketPrice: 1,
                totalTicketsSold: { $size: "$tickets" }
            }
        },
        {
            $sort: { totalTicketsSold: -1 }
        },
        {
            $limit: 20
        }
    ]);

    // overall reviews rating should be calculated and greater than 3
    // const events = await eventModel.aggregate([
    //     {
    //         $project: {
    //             name: 1,
    //             tickets: 1,
    //             reviews: 1,
    //             organizer: 1,
    //             date: 1,
    //             status: 1,
    //             capacity: 1,
    //             ticketPrice: 1,
    //             totalTicketsSold: { $size: "$tickets" },
    //             reviewsRating: { $avg: "$reviews.rating" }
    //         }
    //     },
    //     {
    //         $sort: { totalTicketsSold: -1 }
    //     },
    //     {
    //         $limit: 15
    //     }
    // ]);

    // // overall reviews rating should be calculated and greater than 3
    // const events = await eventModel.aggregate([
    //     {
    //         $project: {
    //             name: 1,
    //             tickets: 1,
    //             reviews: 1,
    //             organizer: 1,
    //             date: 1,
    //             status: 1,
    //             capacity: 1,
    //             ticketPrice: 1,
    //             totalTicketsSold: { $size: "$tickets" },
    //             reviewsRating: { $avg: "$reviews.rating" }
    //         }
    //     },
    //     {
    //         $match: { reviewsRating: { $gte: 3 } }
    //     },
    //     {
    //         $sort: { totalTicketsSold: -1 }
    //     },
    //     {
    //         $limit: 15
    //     }
    // ]);
    // // console.log("events")
    // // console.log(events)
    return events;
};


// using aggregate of mongoose
// Count Events by Status
export const countEventsByStatus = async (organizerId) => {

    const objOrganizerId = mongoose.Types.ObjectId.createFromHexString(organizerId);

    const events = await eventModel.aggregate([
        {
            $match: { organizer: objOrganizerId }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
                events: {
                    $push: {
                        _id: "$_id",
                        title: "$title",
                        description: "$description",
                        date: "$date",
                        startTime: "$startTime",
                        endTime: "$endTime",
                        location: "$location",
                        organizer: "$organizer",
                        capacity: "$capacity",
                        category: "$category",
                        // tickets: "$tickets",
                        // reviews: "$reviews",
                        ticketPrice: "$ticketPrice",
                        totalTicketsSold: { $size: "$tickets" },
                        reviewsRating: { $avg: "$reviews.rating" },
                        status: "$status",
                        media: "$media",
                        createdAt: "$createdAt",
                        updatedAt: "$updatedAt"
                    }
                }
            }
        }
    ]);
    // console.log("events")
    // console.log(events)
    return events;
};

// Total Number of Tickets Sold for Each Event
export const countTicketsSold = async () => {
    const events = await eventModel.aggregate([
        {
            $project: {
                name: 1,
                tickets: 1,
                organizer: 1,
                date: 1,
                status: 1,
                capacity: 1,
                ticketPrice: 1,
                totalTicketsSold: { $size: "$tickets" }
            }
        }
    ]);
    return events;
};

// Events with the Highest Ratings
export const getEventsWithHighestRatings = async () => {
    const events = await eventModel.aggregate([
        {
            $project: {
                name: 1,
                tickets: 1,
                reviews: 1,
                organizer: 1,
                date: 1,
                status: 1,
                capacity: 1,
                ticketPrice: 1,
                totalTicketsSold: { $size: "$tickets" },
                reviewsRating: { $avg: "$reviews.rating" }
            }
        },
        {
            $sort: { reviewsRating: -1 }
        }
    ]);
    return events;
};

// aggregation calculates the total revenue generated from ticket sales for each event.
export const getTotalRevenueGenerated = async (organizerId) => {

    const objOrganizerId = mongoose.Types.ObjectId.createFromHexString(organizerId);

    const totalRevenueGenerated = await eventModel.aggregate([
        {
            $match: { organizer: objOrganizerId }
        },
        {
            $project: {
                // _id: 1,
                // name: 1,
                // tickets: 1,
                // organizer: 1,
                // date: 1,
                status: 1,
                // capacity: 1,
                ticketPrice: 1,
                totalTicketsSold: { $size: "$tickets" }
            }
        },
        {
            status: "past"
        },
        {
            $addFields: {
                revenue: { $multiply: ["$totalTicketsSold", "$ticketPrice"] }
            }
        },
        {
            // sum of revenue
            $group: {
                _id: null, // group all documents
                totalRevenue: { $sum: "$revenue" }
            }
        }
    ]);
    return totalRevenueGenerated;
}


// search events name or description
export const searchEvents = async (query) => {
    const events = await eventModel.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ]
    });
    return events;
};


// get all events
export const fetchEvents = async ({ search = '', page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = {}) => {

    const matchStage = {};

    if (filters.isOrganizer) {
        matchStage.organizer = mongoose.Types.ObjectId.createFromHexString(filters.organizer);
    } else if (filters.isUser) {
        matchStage.organizer = { $ne: mongoose.Types.ObjectId.createFromHexString(filters.organizer) };
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
        {
            $lookup: {
                from: 'reviews', // Name of the reviews collection
                localField: '_id',
                foreignField: 'event',
                as: 'reviews',
            },
        },
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
        {
            $addFields: {
                averageRating: { $avg: '$reviews.rating' }
            }
        },
    ];
    // Add the rating filter
    // avg rating of the event should be greater than or equal to the min rating and less than or equal to the max rating
    if (filters.reviews) {
        aggregationPipeline.push({
            $match: {
                averageRating: { $gte: filters.reviews.min, $lte: filters.reviews.max }
            }
        });
    }

    // const events = await EventModel.aggregate([
    //     { $match: matchStage },
    //     { $sort: { [sortBy]: sortOrderValue } },
    //     { $skip: (page - 1) * limit },
    //     { $limit: limit }
    // ]);

    console.log((page - 1))
    console.log(limit)

    aggregationPipeline.push(
        { $sort: { [sortBy]: sortOrderValue } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $project : {
                _id: 1,
                name: 1,
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

    // console.log(matchStage)
    // console.log(filters)
    // console.log(events)

    // return events;
    return {
        events,
        page,
        totalPages: Math.ceil(events.length / limit)
    }
};


const averageRating = async () => {
    return await eventModel.aggregate([
        { $unwind: "$reviews" },
        {
            $lookup: {
                from: "reviews",
                localField: "reviews",
                foreignField: "_id",
                as: "reviewDetails"
            }
        },
        { $unwind: "$reviewDetails" },
        {
            $group: {
                _id: "$_id",
                averageRating: { $avg: "$reviewDetails.rating" }
            }
        }
    ]);
}


// Pseudocode for sentiment analysis
const sentimentAnalysis = async () => {
    return await eventModel.aggregate([
        { $unwind: "$reviews" },
        {
            $lookup: {
                from: "reviews",
                localField: "reviews",
                foreignField: "_id",
                as: "reviewDetails"
            }
        },
        { $unwind: "$reviewDetails" },
        {
            $group: {
                _id: "$_id",
                positiveReviews: { $sum: { $cond: [{ $gt: ["$reviewDetails.rating", 3] }, 1, 0] } },
                neutralReviews: { $sum: { $cond: [{ $eq: ["$reviewDetails.rating", 3] }, 1, 0] } },
                negativeReviews: { $sum: { $cond: [{ $lt: ["$reviewDetails.rating", 3] }, 1, 0] } }
            }
        }
    ]);
}

const popularCategories = async () => {
    return await eventModel.aggregate([
        { $group: { _id: "$category", totalEvents: { $sum: 1 } } },
        { $sort: { totalEvents: -1 } }
    ]);
}
