

import connectDB from "../utils/database.js";
import { MongoClient } from 'mongodb';

import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";
import reviewModel from "../models/review.model.js";
import ticketModel from "../models/ticket.model.js";
import scriptModel from "../models/script.model.js";

async function changeEventsStatus() {

    const url = 'mongodb://localhost:27017/'
    const dbName = 'meanStackDb';
    
    try {

        await connectDB(url + dbName);

        const todaysDate = new Date();

        // take all events whose 'date' is in the past or today and 'endTime' is also in the past
        const eventsToBeChangedToPast = await eventModel.aggregate([
            {
                $match: {
                    date: { $lte: todaysDate },
                    endTime: { $lte: todaysDate.getHours() },
                    status: { $ne: "past" },
                },
            }
        ])

        // write bulk operations
        const bulkOperations = eventsToBeChangedToPast.map(event => ({
            updateOne: {
                filter: {
                    _id: event._id,
                },
                update: { $set: { status: "past" } },
            }
        }));

        // await eventModel.bulkWrite(bulkOperations);









        // take all events whose 'date' is today and 'startTime' is in the past
        const eventsToBeChangedToOngoing = await eventModel.aggregate([
            {
                $match: {
                    date: todaysDate,
                    startTime: { $lte: todaysDate.getHours() },
                    status: { 
                        // $ne: "ongoing",
                        // $ne: "past",
                        $eq: "upcoming"
                    },
                },
            }
        ])

        // write bulk operations
        const bulkOperations2 = eventsToBeChangedToOngoing.map(event => ({
            updateOne: {
                filter: {
                    _id: event._id,
                },
                update: { $set: { status: "ongoing" } },
            }
        }));

        // await eventModel.bulkWrite(bulkOperations2);




        // find users who have purchased a ticket and have not given a review
        const usersWithTickets = await ticketModel.aggregate([
        ]);

        console.log(usersWithTickets);

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

changeEventsStatus();
