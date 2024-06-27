
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

// "Morning", "Afternoon", "Evening", "Night"
export const ticketsBoughtByTimeOfDayAnalytics = async (eventId) => {
    const event = await eventModel.findById(eventId);


    const tickets = await ticketModel.find({ event: eventId });

    // create an array of tickets bought count for each time of day in the event date
    const ticketsBoughtByTimeOfDay = Array.from({ length: 4 }, (_, i) => {
        const startTime = event.startTime;
        const endTime = event.endTime;
        const timeOfDay = i + 1;

        const ticketsBoughtCount = tickets.filter(
            (ticket) =>
                ticket.purchaseDate >= startTime &&
                ticket.purchaseDate <= endTime
        ).length;

        return {
            timeOfDay,
            ticketsBoughtCount,
        };
    });

    console.log(ticketsBoughtByTimeOfDay)

    const allLabels = ticketsBoughtByTimeOfDay.map((data) => {
        if (data.timeOfDay === 1) {
            return "Morning";
        } else if (data.timeOfDay === 2) {
            return "Afternoon";
        } else if (data.timeOfDay === 3) {
            return "Evening";
        } else {
            return "Night";
        }
    }
    );

    const allData = ticketsBoughtByTimeOfDay.map((data) => data.ticketsBoughtCount);

    return {
        labels: allLabels,
        datasets: allData,
    };

}
























export const numberOfEventsCreatedInLast12MonthsByUserAnalytics = async (userId) => {

    const user = await userModel.findById(userId);

    // if (!user) {
    //     return null;
    // }

    // get all events created by the user
    const events = await eventModel.find({ organizer: userId });

    // create an array of events created count for each month in the last 12 months
    const last12MonthsEventsCreated = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);

        const eventsCreatedCount = events.filter(
            (event) =>
                new Date(event.createdAt).getMonth() === date.getMonth()
        ).length;

        return {
            month: date.toLocaleString("default", { month: "long" }),
            eventsCreatedCount,
        };
    });

    // console.log(last12MonthsEventsCreated)

    const allLabels = last12MonthsEventsCreated.map((data) => data.month).reverse();
    const allData = last12MonthsEventsCreated.map((data) => data.eventsCreatedCount).reverse();

    return {
        labels: allLabels,
        datasets: allData,
    };

}





export const allEventsByUserUniqueCategoriesByCountAnalytics = async (userId) => {

    // const user = await userModel.findById(userId);

    // if (!user) {
    //     return null;
    // }

    // get all events created by the user
    const events = await eventModel.find({ organizer: userId });

    // get all events unique categories and count of events in each category
    const eventsCategoryCount = events.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
    }, {});

    // console.log(eventsCategoryCount)

    const allLabels = Object.keys(eventsCategoryCount);
    const allData = Object.values(eventsCategoryCount);

    return {
        labels: allLabels,
        datasets: allData,
    };

}





// "Morning", "Afternoon", "Evening", "Night"
export const mostEventTimeOfDayAnalytics = async (userId) => {

        // get all events created by the user
        const events = await eventModel.find({ organizer: userId });

        // console.log(events)

        // totalMinutes = 24 * 60 = 1440
        // 300-539 = Morning, 540-779 = Afternoon, 780-1019 = Evening, 1020-1439 0-259 = Night
    
        // create an array of events created count for each time of day in the event date, just see the start time of the event
        const eventsTimeOfDay = Array.from({ length: 4 }, (_, i) => {
            const timeOfDay = i + 1;
    
            const eventsCount = events.filter(
                (event) => {
                    const startTime = event.startTime;
                    // const endTime = event.endTime;

                    console.log(startTime)
                    console.log(timeOfDay)
    
                    // if (timeOfDay === 1) {
                    //     return startTime >= 300;
                    // } else if (timeOfDay === 2) {
                    //     return startTime >= 540;
                    // } else if (timeOfDay === 3) {
                    //     return startTime >= 780;
                    // } else {
                    //     return startTime >= 1020 || startTime >= 0;
                    // }

                    if (timeOfDay === 1) {
                        return startTime >= 300;
                    } else if (timeOfDay === 2) {
                        return startTime >= 540;
                    } else if (timeOfDay === 3) {
                        return startTime >= 780;
                    } else {
                        return startTime >= 1020 || startTime >= 0;
                    }
                }
            ).length;
    
            return {
                timeOfDay,
                eventsCount,
            };
        });

        console.log(eventsTimeOfDay)

        const allLabels = eventsTimeOfDay.map((data) => {
            if (data.timeOfDay === 1) {
                return "Morning";
            } else if (data.timeOfDay === 2) {
                return "Afternoon";
            } else if (data.timeOfDay === 3) {
                return "Evening";
            } else {
                return "Night";
            }
        }
        );

        const allData = eventsTimeOfDay.map((data) => data.eventsCount);

        return {
            labels: allLabels,
            datasets: allData,
        };
}