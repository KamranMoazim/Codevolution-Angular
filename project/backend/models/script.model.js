import mongoose from "mongoose";



const scriptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true,
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
    },
    { timestamps: true }
);

const ScriptModel = mongoose.model("Script", scriptSchema);

export default ScriptModel;
