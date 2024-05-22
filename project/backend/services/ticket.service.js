
import ticketModel from "../models/ticket.model.js";


// purchase ticket
export const purchaseTicket = async (ticketData) => {
    const ticket = await ticketModel.create(ticketData);
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