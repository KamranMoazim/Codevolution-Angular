import mongoose from "mongoose";

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
            enum: ["purchased", "canceled"],
            default: "purchased",
        },
    },
    { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
