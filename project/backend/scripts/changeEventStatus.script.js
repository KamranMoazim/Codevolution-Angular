

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
        const client = new MongoClient(url);
        const db = client.db(dbName);



        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

        await eventModel.bulkWrite(bulkOperations);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

        await eventModel.bulkWrite(bulkOperations2);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // find users who have purchased a ticket and have not given a review
        const usersWithoutReviewingEvents = await ticketModel.aggregate([
            // find users who have purchased a ticket
            {
                $project: {
                    user: 1,
                    event: 1,
                }
            },

            // now find users who have given a review for the event
            {
                $lookup: {
                    from: "reviews",
                    let: { event_id: "$event", user_id: "$user" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$event", "$$event_id"] },
                                        { $eq: ["$user", "$$user_id"] },
                                    ]
                                }
                            }
                        }
                    ],
                    as: "reviewed_events",
                }
            },

            // now find whose reviewed_events array is empty
            {
                $match: {
                    reviewed_events: { $eq: [] }
                }
            },

            // now project only user and event
            {
                $project: {
                    user: 1,
                    event: 1,
                }
            },

            // do lookup for both user and event
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                }
            },
            {
                $lookup: {
                    from: "events",
                    localField: "event",
                    foreignField: "_id",
                    as: "event",
                }
            },

            // unwind both user and event
            {
                $unwind: "$user"
            },
            {
                $unwind: "$event"
            },
        ]);

        // console.log(usersWithoutReviewingEvents)

        // now write usersWithoutReviewingEvents to a new collection called script
        const bulkOperations3 = usersWithoutReviewingEvents.map(doc => ({
            updateOne: {
                filter: {
                    _id: doc._id,
                    event: doc.event,
                    user: doc.user,
                },
                update: { $setOnInsert: doc },
                upsert: true,
            }
        }));

        // delete collection
        await db.collection('users_not_gave_reviews').deleteMany({});

        // Execute bulk write operations
        await db.collection('users_not_gave_reviews').bulkWrite(bulkOperations3);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

// changeEventsStatus();


// 