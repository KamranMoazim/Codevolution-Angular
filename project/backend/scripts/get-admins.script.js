

import connectDB from "../utils/database.js";
import { MongoClient } from 'mongodb';

import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";
import reviewModel from "../models/review.model.js";
import ticketModel from "../models/ticket.model.js";
import scriptModel from "../models/script.model.js";

async function exportAdminsToAdminColletion() {

    const url = 'mongodb://localhost:27017/'
    const dbName = 'meanStackDb';
    
    try {

        await connectDB(url + dbName);
        
        const client = new MongoClient(url);
        const db = client.db(dbName);

        const allAdmins = await userModel.aggregate([
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

        // now save users who have purchased a ticket and have given a review in a new collection called script

        // loop through allAdmins and create bulk write operations (if admin does not exist in the collection)
        const bulkOperations = allAdmins.map(admin => ({
            updateOne: {
                filter: {
                    email: admin.email,
                    role: 'admin',
                },
                update: { $set: admin },
                upsert: true,
            }
        }));

        // Execute bulk write operations
        const bulkWriteResult = await db.collection('admins').bulkWrite(bulkOperations);

        console.log('Bulk write result:', bulkWriteResult);


    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

exportAdminsToAdminColletion();
