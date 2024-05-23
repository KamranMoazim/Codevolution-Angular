import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bio: {
            type: String,
            required: [true, "Please enter your bio"],
        },
        followers: [{ // people following this user
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", profileSchema);
// module.exports = Profile;

export default ProfileModel;