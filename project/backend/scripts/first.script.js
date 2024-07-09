import connectDB from "../utils/database.js";
import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";
import reviewModel from "../models/review.model.js";
import ticketModel from "../models/ticket.model.js";
import scriptModel from "../models/script.model.js";


async function exportPeronsWhoHavePurchasedTicketsAndGivenA_Review_ToScriptsCollection() {

    try {
        // Connect to MongoDB
        await connectDB('mongodb://localhost:27017/meanStackDb');

        const cursor = await userModel.aggregate([
            {
                $lookup: {
                    from: "tickets",
                    localField: "_id",
                    foreignField: "user",
                    as: "tickets",
                },
            },
            
            {
                $unwind: "$tickets",
            },
            
            {
                $lookup: {
                    from: "reviews",
                    localField: "tickets.event",
                    foreignField: "event",
                    as: "reviews",
                },
            },

            {
                $unwind: "$reviews",
            },

            {
                $project: {
                    _id: 0,
                    user: '$_id',
                    ticket: '$tickets._id',
                    review: '$reviews._id',
                    event: '$tickets.event',
                }
            }
        ]);
        // ], { cursor: { batchSize: 10 } });


        // // now save users who have purchased a ticket and have given a review in a new collection called script
        // const result = await cursor.toArray();
        // console.log(result[0]);
        // await script.insertMany(result[0]);
        // await db.collection('script').insertOne(result[0]);

        // Use bulkWrite to perform upsert operations
        const bulkOperations = cursor.map(doc => ({
            updateOne: {
                filter: {
                    user: doc.user,
                    ticket: doc.ticket,
                    review: doc.review,
                    event: doc.event,
                },
                update: { $setOnInsert: doc },
                upsert: true,
            }
        }));
        // bulkOperations -- it will find the doc, if not found it will insert the doc else it will update the doc (means same doc with same values will be updated)

        // Execute bulk write operations
        const bulkWriteResult = await scriptModel.bulkWrite(bulkOperations);
        console.log('Bulk write result:', bulkWriteResult);


    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

await exportPeronsWhoHavePurchasedTicketsAndGivenA_Review_ToScriptsCollection();
