

import connectDB from "../utils/database.js";
import fs from 'fs';

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

        // read json file and insert into collection
        const users = JSON.parse(fs.readFileSync('/home/kamranmoazim/Desktop/angPrc/project/backend/data/users.json', 'utf-8'));
        // console.log(users)
        await db.collection('dummy_users').insertMany(users);

        // now insert events
        const events = JSON.parse(fs.readFileSync('/home/kamranmoazim/Desktop/angPrc/project/backend/data/events.json', 'utf-8'));
        // console.log(events)
        await db.collection('dummy_events').insertMany(events);

        // now insert reviews
        const reviews = JSON.parse(fs.readFileSync('/home/kamranmoazim/Desktop/angPrc/project/backend/data/reviews.json', 'utf-8'));
        // console.log(reviews)
        await db.collection('dummy_reviews').insertMany(reviews);

        // now insert tickets
        const tickets = JSON.parse(fs.readFileSync('/home/kamranmoazim/Desktop/angPrc/project/backend/data/tickets.json', 'utf-8'));
        // console.log(tickets)
        await db.collection('dummy_tickets').insertMany(tickets);


        console.log('Data inserted successfully');


    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

await exportAdminsToAdminColletion();
