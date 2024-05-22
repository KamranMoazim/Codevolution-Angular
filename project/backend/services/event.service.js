// import { redis } from "../utils/redis";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";



// get all events
export const getAllEvents = async () => {
    const events = await eventModel.find()
                                    .sort({ date: -1 });
    return events;
};

// find all events user has purchased tickets for
export const getEventsByUserId = async (userId) => {
    const tickets = await ticketModel.find({ user: userId });
    return tickets;
};

// get event by id
export const getEventById = async (eventId) => {
    const event = await eventModel.findById(eventId);
    return event;
};

// get all events user has created
export const getEventsByUser = async (userId) => {
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
    const updateEvent = await eventModel.findOne({ _id: eventId })
                                        .updateOne(event);
    return updateEvent;
};

// get number of tickets sold for an event -- capacity property
export const getEventsSoldTickets = async (eventId) => {
    // const tickets = await ticketModel.find({ event: eventId });
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