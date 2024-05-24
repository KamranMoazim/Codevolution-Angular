import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        avatar: {
            type: String,
            default: "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
        },
        bio: {
            type: String,
            required: [true, "Please enter your bio"],
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    { timestamps: true }
);



const ProfileModel = mongoose.model("Profile", profileSchema);
// module.exports = Profile;

export default ProfileModel;