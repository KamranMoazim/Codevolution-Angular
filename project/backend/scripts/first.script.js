import { MongoClient } from 'mongodb';

async function exportPeronsWhoHavePurchasedTicketsAndGivenA_Review_ToScriptsCollection() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'meanStackDb';
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        const cursor = await db.collection('users').aggregate([
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
        const documentsToInsert = await cursor.toArray();
        const bulkOperations = documentsToInsert.map(doc => ({
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
        const bulkWriteResult = await db.collection('script').bulkWrite(bulkOperations);
        console.log('Bulk write result:', bulkWriteResult);


    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

await exportPeronsWhoHavePurchasedTicketsAndGivenA_Review_ToScriptsCollection();
