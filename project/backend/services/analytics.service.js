import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/ticket.model.js";
import reviewModel from "../models/review.model.js";





export const getLast30DaysTicketsBoughtAnalytics = async (eventId) => {
    const event = await eventModel.findById(eventId);
    const endDate = new Date(event.date);
    const startDate = new Date(event.date);
    startDate.setDate(endDate.getDate() - 29);  // Last 30 days including event date

    const ticketsBoughtAnalytics = await ticketModel.aggregate([
        {
            $match: {
                event: mongoose.Types.ObjectId.createFromHexString(eventId),
                // event: eventId,
                purchaseDate: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$purchaseDate" }
                },
                count: { $sum: 1 }
            }
        }
    ]);

    const analyticsMap = new Map(ticketsBoughtAnalytics.map(data => [data._id, data.count]));

    const last30DaysTicketsBought = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(event.date);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        return {
            date: dateString,
            ticketsBoughtCount: analyticsMap.get(dateString) || 0,
        };
    }).reverse();

    const allLabels = last30DaysTicketsBought.map(data => data.date);
    const allData = last30DaysTicketsBought.map(data => data.ticketsBoughtCount);

    return {
        labels: allLabels,
        datasets: allData,
    };
}






export const eachStarCountAnalytics = async (eventId) => {
    const starCountAnalytics = await reviewModel.aggregate([
        {
            $match: { event: mongoose.Types.ObjectId.createFromHexString(eventId) }
            // $match: { event: eventId }
        },
        {
            $group: {
                _id: "$rating",
                count: { $sum: 1 }
            }
        },
    ]);

    // Create a map for quick lookup
    const analyticsMap = new Map(starCountAnalytics.map(data => [data._id, data.count]));

    // Create an array with counts for each star from 1 to 5
    const eachStarCount = Array.from({ length: 5 }, (_, i) => {
        const star = i + 1;
        return {
            star,
            ticketsCount: analyticsMap.get(star) || 0,
        };
    });

    const allLabels = eachStarCount.map(data => data.star);
    const allData = eachStarCount.map(data => data.ticketsCount);

    return {
        labels: allLabels,
        datasets: allData,
    };
};



export const ticketsBoughtByTimeOfDayAnalytics = async (eventId) => {
    const event = await eventModel.findById(eventId);

    // Define the time ranges for each segment of the day
    const timeRanges = [
        { label: "Morning", start: 0, end: 6 },  // 12 AM - 6 AM
        { label: "Afternoon", start: 6, end: 12 },  // 6 AM - 12 PM
        { label: "Evening", start: 12, end: 18 },  // 12 PM - 6 PM
        { label: "Night", start: 18, end: 24 }   // 6 PM - 12 AM
    ];

    const ticketsBoughtAnalytics = await ticketModel.aggregate([
        {
            $match: {
                // event: mongoose.Types.ObjectId.createFromHexString(eventId),
                event: eventId,
                purchaseDate: {
                    $gte: new Date(event.startTime),
                    $lte: new Date(event.endTime)
                }
            }
        },
        {
            $project: {
                purchaseHour: { $hour: "$purchaseDate" }
            }
        },
        {
            $bucket: {
                groupBy: "$purchaseHour",
                boundaries: [0, 6, 12, 18, 24],
                default: "Other",
                output: {
                    count: { $sum: 1 }
                }
            }
        }
    ]);

    // Map results to labels and counts
    const analyticsMap = new Map(ticketsBoughtAnalytics.map(data => [data._id, data.count]));

    const ticketsBoughtByTimeOfDay = timeRanges.map(({ label, start }) => ({
        timeOfDay: label,
        ticketsBoughtCount: analyticsMap.get(start) || 0,
    }));

    const allLabels = ticketsBoughtByTimeOfDay.map(data => data.timeOfDay);
    const allData = ticketsBoughtByTimeOfDay.map(data => data.ticketsBoughtCount);

    return {
        labels: allLabels,
        datasets: allData,
    };
};







































export const numberOfEventsCreatedInLast12MonthsByUserAnalytics = async (userId) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 11); // Set to 12 months ago

    const eventsCreatedAnalytics = await eventModel.aggregate([
        {
            $match: {
                // organizer: mongoose.Types.ObjectId.createFromHexString(userId),
                organizer: userId,
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                year: { $first: { $year: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "year": -1, "_id": -1 }
        }
    ]);

    const currentMonth = endDate.getMonth() + 1;
    const currentYear = endDate.getFullYear();

    // Initialize an array with zero counts for each month
    const last12MonthsEventsCreated = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return {
            month: date.toLocaleString("default", { month: "long" }),
            year: date.getFullYear(),
            eventsCreatedCount: 0
        };
    });

    // Create a map for quick lookup
    const analyticsMap = new Map(eventsCreatedAnalytics.map(data => [`${data.year}-${data._id}`, data.count]));

    // Populate the counts from the analyticsMap
    last12MonthsEventsCreated.forEach((data, index) => {
        const month = (currentMonth - index - 1 + 12) % 12 + 1;
        const year = currentYear - Math.floor((currentMonth - index - 1) / 12);
        data.eventsCreatedCount = analyticsMap.get(`${year}-${month}`) || 0;
    });

    const allLabels = last12MonthsEventsCreated.map(data => data.month).reverse();
    const allData = last12MonthsEventsCreated.map(data => data.eventsCreatedCount).reverse();

    return {
        labels: allLabels,
        datasets: allData,
    };
};


export const allEventsByUserUniqueCategoriesByCountAnalytics = async (userId) => {
    const eventsCategoryCount = await eventModel.aggregate([
        {
            $match: {
                // organizer: mongoose.Types.ObjectId.createFromHexString(userId)
                organizer: userId
            }
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]);

    const allLabels = eventsCategoryCount.map(data => data._id);
    const allData = eventsCategoryCount.map(data => data.count);

    return {
        labels: allLabels,
        datasets: allData,
    };
};





export const totalRevenueAnalytics = async (userId) => {

    // Aggregate events organized by the user
    const events = await eventModel.find({ organizer: userId }).select('_id');
    const eventIds = events.map(event => event._id);

    // Aggregate total revenue and ticket count for the events
    const ticketsAggregation = await ticketModel.aggregate([
        {
            $match: { event: { $in: eventIds } }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$price" },
                totalTickets: { $sum: 1 }
            }
        }
    ]);

    const { totalRevenue = 0, totalTickets = 0 } = ticketsAggregation[0] || {};

    // Count total reviews for the events
    const totalReviews = await reviewModel.countDocuments({ event: { $in: eventIds } });

    return {
        totalRevenue,
        totalEvents: events.length,
        totalTickets,
        totalReviews
    };
};
