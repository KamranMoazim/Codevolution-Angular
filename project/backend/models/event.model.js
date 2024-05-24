import mongoose from "mongoose";



const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter event title"],
        },
        description: {
            type: String,
            required: [true, "Please enter event description"],
        },
        date: {
            type: Date,
            required: [true, "Please enter event date"],
        },
        startTime: {
            type: String,
            required: [true, "Please enter event start time"],
        },
        endTime: {
            type: String,
            required: [true, "Please enter event end time"],
        },
        location: {
            type: String,
            required: [true, "Please enter event location"],
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        capacity: {
            type: Number,
            required: [true, "Please enter event capacity"],
        },
        category: {
            type: String,
            required: [true, "Please enter event category"],
        },
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
        }],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }],
        ticketPrice: {
            type: Number,
            required: [true, "Please enter ticket price"],
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "past", "canceled"],
            default: "upcoming",
        },
        // sould be list of image urls
        media: [{
            type: String,
        }]
    },
    { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
