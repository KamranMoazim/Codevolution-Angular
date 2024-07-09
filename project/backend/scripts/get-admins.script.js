import { MongoClient } from 'mongodb';

async function exportAdminsToAdminColletion() {
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
                $match: {
                    role: 'admin',
                },
            },
            
            {
                $project: {
                    name: 1,
                    email: 1,
                    role: 1,
                },
            }
        ]);


        // // now save users who have purchased a ticket and have given a review in a new collection called script
        // const result = await cursor.toArray();
        // console.log(result);
        // // await script.insertMany(result[0]);
        // await db.collection('script').insertOne(result[0]);

        // Use bulkWrite to perform upsert operations
        const documentsToInsert = await cursor.toArray();
        const bulkOperations = documentsToInsert.map(doc => ({
            updateOne: {
                filter: {
                    _id: doc._id,
                },
                update: { $setOnInsert: doc },
                upsert: true,
            }
        }));
        // bulkOperations -- it will find the doc, if not found it will insert the doc else it will update the doc (means same doc with same values will be updated)

        // Execute bulk write operations
        const bulkWriteResult = await db.collection('admins').bulkWrite(bulkOperations);
        console.log('Bulk write result:', bulkWriteResult);


    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

await exportAdminsToAdminColletion();
