
import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";




export const getLast30DaysTicketsBoughtAnalytics = async (eventId) => {
    const event = await eventModel.findById(eventId);

    if (!event) {
        return null;
    }

    const tickets = await ticketModel.find({ event: eventId });

    // create an array of tickets bought count for each day in the last 30 days from event date
    const last30DaysTicketsBought = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(event.date);
        date.setDate(date.getDate() - i);

        const ticketsBoughtCount = tickets.filter(
            (ticket) =>
                ticket.purchaseDate.toDateString() === date.toDateString()
        ).length;

        return {
            date: date.toDateString(),
            ticketsBoughtCount,
        };
    });

    console.log(last30DaysTicketsBought)

    return last30DaysTicketsBought;
}