import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter tag name"],
            unique: true,
        },
    },
    { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
