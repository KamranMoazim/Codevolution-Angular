// import { redis } from "../utils/redis";
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
    const event = await eventModel.findById(eventId).populate("tickets");
    return event;
};

// get all events particular user has created
export const getEventsByUserId = async (userId) => {
    const events = await eventModel.find({ organizer: userId })
                                    .sort({ date: -1 });
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
    const event = await eventModel.findById(eventId);
    return event.capacity - event.tickets.length;
}

// get particular status events of particular user
export const getEventsByStatusOfParticularUser = async (userId, status) => {
    const events = await eventModel.find({ organizer: userId, status }).sort({ date: -1 });;
    return events;
};

// get list of persons who have bought ticket for an event
export const getPersonsWhoBoughtTicket = async (eventId) => {
    const event = await eventModel.findById(eventId).populate("tickets");
    const tickets = event.tickets;
    const users = [];
    for (let i = 0; i < tickets.length; i++) {
        // console.log(tickets[i])
        const user = await ticketModel.findById(tickets[i]).populate("user").select("user -_id");
        users.push(user.get("user"));
    }
    return users;
}

// get top 15 events with most tickets sold along with their reviews 
export const getTopEvents = async () => {
    const events = await eventModel.find()
                                    .sort({ tickets: -1 })
                                    .limit(15);
    return events;


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
    //             totalTicketsSold: { $size: "$tickets" }
    //         }
    //     },
    //     {
    //         $sort: { totalTicketsSold: -1 }
    //     },
    //     {
    //         $limit: 15
    //     }
    // ]);

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
    // return events;
};