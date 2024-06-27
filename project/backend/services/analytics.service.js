
import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";




export const getLast30DaysTicketsBoughtAnalytics = async (eventId) => {
    const event = await eventModel.findById(eventId);

    // if (!event) {
    //     return null;
    // }

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

    // console.log(last30DaysTicketsBought)

    const allLabels = last30DaysTicketsBought.map((data) => data.date).reverse();
    const allData = last30DaysTicketsBought.map((data) => data.ticketsBoughtCount).reverse();

    return {
        labels: allLabels,
        datasets: allData,
    };
}




export const eachStarCountAnalytics = async (eventId) => {

    // count how many 1 star, 2 star, 3 star, 4 star, 5 star reviews are there for the event
    const reviews = await reviewModel.find({ event: eventId });

    const eachStarCount = Array.from({ length: 5 }, (_, i) => {
        const star = i + 1;
        const ticketsCount = reviews.filter(
            (review) => review.rating === star
        ).length;

        return {
            star,
            ticketsCount,
        };
    });

    console.log(eachStarCount)

    const allLabels = eachStarCount.map((data) => data.star);
    const allData = eachStarCount.map((data) => data.ticketsCount);

    return {
        labels: allLabels,
        datasets: allData,
    };
}