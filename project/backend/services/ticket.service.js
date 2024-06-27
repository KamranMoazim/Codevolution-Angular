
import ticketModel from "../models/ticket.model.js";
import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";


// purchase ticket
export const purchaseTicket = async (ticketData) => {
    const ticket = await ticketModel.create(ticketData);

    // update event tickets array
    await eventModel.findByIdAndUpdate(ticketData.event, {
        $addToSet: { tickets: ticket._id }
    });

    // update user tickets array
    await userModel.findByIdAndUpdate(ticketData.user, {
        $addToSet: { tickets: ticket._id }
    });

    return ticket;
};

// check if user has already bought ticket for event
export const checkIfUserHasTicket = async (userId, eventId) => {
    const ticket = await ticketModel.findOne({ user: userId, event: eventId });
    return ticket;
};

// cancel ticket
export const cancelTicket = async (ticketId) => {
    const ticket = await ticketModel.findById(ticketId);
    ticket.status = "canceled";
    await ticket.save();
    return ticket;
};

// get all tickets user has purchased
export const getTicketsByUserId = async (userId) => {
    const tickets = await ticketModel.find({ user: userId });
    return tickets;
};