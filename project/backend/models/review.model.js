import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
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
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
// module.exports = Review;

// reviewSchema.post("save", async function (doc, next) {
//     const EventModel = mongoose.model("Event");
//     await EventModel.findByIdAndUpdate(doc.event, {
//         $push: { reviews: doc._id },
//     });
//     next();
// });

export default ReviewModel
