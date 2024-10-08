
import ticketModel from "../models/ticket.model.js";
import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";


// purchase ticket
export const purchaseTicket = async (ticketData) => {
    const ticket = await ticketModel.create(ticketData);

    // update event tickets array also update event numberOfTicketsSold
    await eventModel.findByIdAndUpdate(ticketData.event, {
        $addToSet: { tickets: ticket._id },
        $inc: { numberOfTicketsSold: 1 }
    });


    // update user tickets array
    await userModel.findByIdAndUpdate(ticketData.user, {
        $addToSet: { tickets: ticket._id }
    });

    return ticket;
};


// return ticket
export const returnTicket = async (ticketId) => {
    // Find the ticket by ID
    const ticket = await ticketModel.findById(ticketId);

    // Update event tickets array and numberOfTicketsSold
    await eventModel.findByIdAndUpdate(ticket.event, {
        $pull: { tickets: ticket._id },
        $inc: { numberOfTicketsSold: -1 }
    });

    // Update user tickets array
    await userModel.findByIdAndUpdate(ticket.user, {
        $pull: { tickets: ticket._id }
    });

    // Remove the ticket
    await ticketModel.findByIdAndDelete(ticketId);


    console.log(ticket)

    return ticket;
};

// check if user has already bought ticket for event
export const checkIfUserHasTicket = async (userId, eventId) => {
    // console.log(userId, eventId)
    const ticket = await ticketModel.findOne({ user: userId, event: eventId });
    // console.log(ticket)
    return ticket;
};
