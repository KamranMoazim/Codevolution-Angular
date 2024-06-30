import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import userModel from '../models/user.model.js';
import eventModel from '../models/event.model.js';


// create 50 Users using 


export const generateFakeUsers = async (req, res, next) => {



    for (let i = 0; i < 4; i++) {
        const user = {
            name: faker.person.firstName() + " " + faker.person.lastName(),
            email: faker.internet.email(),
            password: "Kamran12345",
            role: "user",
            avatar: faker.image.avatar(),
            bio: faker.lorem.sentence()
        };
        // users.push(user);

        try {
            await userModel.create(user);
        } catch (error) {
            console.log(error);
        }
    }

    let adminIds = [];

    for (let i = 0; i < 5; i++) {
        const user = {
            name: faker.person.firstName() + " " + faker.person.lastName(),
            email: faker.internet.email(),
            password: "Kamran12345",
            role: "admin",
            avatar: faker.image.avatar(),
            bio: faker.lorem.sentence()
        };
        // users.push(user);

        try {
            const admin = await userModel.create(user);
            adminIds.push(admin._id);
        } catch (error) {
            console.log(error);
        }
    }

    const statusOptions = ["upcoming", "ongoing", "past"];
    const category = ["music", "sports", "technology", "arts", "food", "fashion", "health", "travel", "science", "education"]

    // creaate 50 events
    for (let i = 0; i < 50; i++) {
    // for (let i = 0; i < 2; i++) {
        const event = {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            // category: faker.random.arrayElement(),
            category: category[Math.floor(Math.random() * category.length)],
            
            location: faker.location.city(),
            capacity: Math.floor(Math.random() * 1000),
            ticketPrice: faker.number.float({ min: 10, max: 100 }),
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],

            // startTime: faker.random.arrayElement([600, 700, 800, 900, 1000]),
            // endTime: faker.random.arrayElement([1200, 1300, 1400, 1500, 1600]),

            startTime: faker.number.int({ min: 600, max: 1000 }),
            endTime: faker.number.int({ 1300: 50, max: 1600 }),
            date: faker.date.future(),

            organizer: adminIds[Math.floor(Math.random() * adminIds.length)],
        };

        try {
            let newEvent = await eventModel.create(event);

            await userModel.updateOne(
                // { _id: mongoose.Types.ObjectId.createFromHexString(event.organizer) },
                { _id: event.organizer },
                { $push: { events: newEvent._id } }
            );
        } catch (error) {
            console.log(error);
        }
    }


    return res.status(201).json({
        success: true,
        message: "Fake users and events created successfully",
    });
}



export const updateAllEventsMedia = async (req, res, next) => {
    const events = await eventModel.find();

    for (let i = 0; i < events.length; i++) {
        const media = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.urlPicsumPhotos());
        await eventModel.updateOne(
            { _id: events[i]._id },
            { media }
        );
    }

    return res.status(201).json({
        success: true,
        message: "Events media updated successfully",
    });
}


export const updateAdmins = async (req, res, next) => {
    // // find all admin users
    // const admins = await userModel.find({ role: "admin" });

    // // delete those admins which have no events
    // for (let i = 0; i < admins.length; i++) {
    //     if (admins[i].events.length === 0) {
    //         await userModel.deleteOne({ _id: admins[i]._id });
    //     }
    // }

    // print all admin users
    const remainingAdmins = await userModel.find({ role: "admin" });
    // console.log(remainingAdmins);
    // print ids of all admin users
    const adminIds = remainingAdmins.map(admin => admin.email);
    console.log(adminIds);

    return res.status(201).json({
        success: true,
        message: "Events media updated successfully",
    });
}

export const updateAllEventsDates = async (req, res, next) => {
    const events = await eventModel.find();

    // generate random dates for all events in next 30 days
    const dates = []
    for (let i = 0; i < events.length; i++) {
        // const date = faker.date.future();
        // take a random date between today and next 30 days
        // const date = faker.date.future(30);
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 30));
        dates.push(date);
    }
    // console.log(dates)

    for (let i = 0; i < events.length; i++) {
        // const date = faker.date.future();
        // take a random date between today and next 30 days
        // const date = faker.date.future(30);
        await eventModel.updateOne(
            { _id: events[i]._id },
            { 
                // random date between today and next 30 days
                date: dates[Math.floor(Math.random() * dates.length)]
            }
        );
    }

    return res.status(201).json({
        success: true,
        message: "Events dates updated successfully",
    });

}