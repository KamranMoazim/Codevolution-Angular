import mongoose from "mongoose";
import EventModel from "./event.model.js";

const ticketSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        price: {
            type: Number,
            required: [true, "Please specify ticket price"],
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["purchased"],
            default: "purchased",
        },
    },
    { timestamps: true }
);

// Post save middleware to update the Event's tickets array
ticketSchema.post("save", async function (doc, next) {
    try {
        await EventModel.findByIdAndUpdate(doc.event, {
            $addToSet: { tickets: doc._id }
        });
        next();
    } catch (err) {
        next(err);
    }
});

const TicketModel = mongoose.model("Ticket", ticketSchema);
// module.exports = Ticket;

export default TicketModel;