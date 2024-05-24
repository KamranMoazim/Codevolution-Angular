import { faker } from '@faker-js/faker';
import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";
import profileModel from "../models/profile.model.js";
import reviewModel from "../models/review.model.js";
import ticketModel from "../models/ticket.model.js";

import connectDB from './database.js';
import { createEvent } from '../services/event.service.js';
import { purchaseTicket } from '../services/ticket.service.js';
import { createEventReview } from '../services/review.service.js';
import { getProfileByUserId } from '../services/profile.service.js';

connectDB("mongodb://localhost:27017/meanStackDb");



export const generateFakeUsers = (count) => {
    const users = [];
    const adminCount = Math.floor(count * 0.10); // Calculate 5% of the total count
    const adminUsers = [];
    const regularUsers = [];

    for (let i = 0; i < count; i++) {
        const user = {
            name: faker.person.firstName() + " " + faker.person.lastName(),
            email: faker.internet.email(),
            // password: faker.internet.password(),
            password: "Kamran12345",
            role: i < adminCount ? "admin" : "user", // First 5% are admins, rest are users
        };

        users.push(user);

        if (i < adminCount) {
            adminUsers.push(user);
        } else {
            regularUsers.push(user);
        }
    }

    return { adminUsers, regularUsers };
}



export const generateFakeEvents = (count, organizers) => {
    const events = [];

    const statusOptions = ["upcoming", "ongoing", "past", "canceled"];

    for (let i = 0; i < count; i++) {
        const event = {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            date: faker.date.future(),
            // startTime: faker.time.recent().slice(0, 5),
            // endTime: faker.time.soon().slice(0, 5),
            startTime: "10:00",
            endTime: "12:00",
            location: faker.location.streetAddress({ useFullAddress: true }),
            organizer: organizers[Math.floor(Math.random() * organizers.length)],
            capacity: faker.number.int({ min: 50, max: 500 }),
            category: faker.word.noun(),
            tickets: [],
            reviews: [],
            ticketPrice: faker.number.float({ min: 10, max: 100, precision: 0.01 }),
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)], // Random status from enum
            media: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.urlPicsumPhotos())
        };
        events.push(event);
    }

    return events;
}


export const generateFakeTickets = (count, events, users) => {
    const tickets = [];

    for (let i = 0; i < count; i++) {
        const ticket = {
            event: events[Math.floor(Math.random() * events.length)],
            user: users[Math.floor(Math.random() * users.length)],
            // price: faker.random.number({ min: 10, max: 100 }),
            // price: random.number.float({ min: 10, max: 100, precision: 0.01 }),
            purchaseDate: faker.date.recent(),
            // status: faker.random.arrayElement(["purchased", "canceled"])
            status: "purchased"
        };
        tickets.push(ticket);
    }

    return tickets;
}


export const generateFakeReviews = (count, events, users) => {
    const reviews = [];

    for (let i = 0; i < count; i++) {
        const review = {
            event: events[Math.floor(Math.random() * events.length)],
            user: users[Math.floor(Math.random() * users.length)],
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.sentence()
        };
        reviews.push(review);
    }

    return reviews;
}


// const users = generateFakeUsers();
// userModel.insertMany(users).then(docs => console.log(`${docs.length} users have been inserted into the database.`))
//     .catch(err => {
//         console.error(err);
//         console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
//     });;


// const { adminUsers, regularUsers } = generateFakeUsers(20);
// const organizers = adminUsers.map(user => user._id);
// const events = generateFakeEvents(50, organizers);
// const tickets = generateFakeTickets(100, events, regularUsers);
// const reviews = generateFakeReviews(100, events, regularUsers);


const { adminUsers, regularUsers } = generateFakeUsers(200);
const organizers = adminUsers.map(user => user._id);
const events = generateFakeEvents(50, organizers);
const tickets = generateFakeTickets(150, events, regularUsers);
const reviews = generateFakeReviews(100, events, regularUsers);


let newUsers = [];
let newEvents = [];
let newTickets = [];
let newReviews = [];

userModel.insertMany(adminUsers.concat(regularUsers))
    .then(users => {
        console.log(`${users.length} users have been inserted into the database.`);
        // return eventModel.insertMany(events);


        // take a list of admin user
        let newCreatedAdmins = [];
        for(const user of users) {
            if(user.role === "admin"){
                newCreatedAdmins.push(user)
            } else {
                newUsers.push(user);
            }
        }


        // let newEvents = [];
        for (const event of events) {
            // event.organizer = users[Math.floor(Math.random() * users.length)]._id;
            event.organizer = newCreatedAdmins[Math.floor(Math.random() * newCreatedAdmins.length)]._id;
            // createEvent(event);
            // newEvents.push(createEvent(event));
        }
        // return Promise.all(newEvents);
        return eventModel.insertMany(events);
    })
    .then(events => {
        console.log(`${events.length} events have been inserted into the database.`);
        // return ticketModel.insertMany(tickets);
        // for (const ticket of tickets) {
        //     purchaseTicket(ticket);
        // }

        for(const event of events) {
            // console.log(event)
            newEvents.push(event);
        }

        // let newTickets = [];
        for (const ticket of tickets) {
            ticket.event = events[Math.floor(Math.random() * events.length)]._id;
            ticket.user = newUsers[Math.floor(Math.random() * newUsers.length)]._id;
            ticket.price = events.find(event => event._id === ticket.event).ticketPrice;
            newTickets.push(purchaseTicket(ticket));
        }
        return Promise.all(newTickets);
    })
    .then(tickets => {
        console.log(`${tickets.length} tickets have been inserted into the database.`);
        // return reviewModel.insertMany(reviews);
        // for (const review of reviews) {
        //     createEventReview(review);
        // }

        console.log("==================================================================================")
        console.log(newEvents[0])
        console.log(newEvents.length)



        // let newReviews = [];
        for (const review of reviews) {
            review.event = newEvents[Math.floor(Math.random() * newEvents.length)]._id;
            review.user = newUsers[Math.floor(Math.random() * newUsers.length)]._id;
            newReviews.push(createEventReview(review));
        }
        return Promise.all(newReviews);
    })
    .then(reviews => console.log(`${reviews.length} reviews have been inserted into the database.`))
    .catch(err => {
        console.error(err);
        console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });;