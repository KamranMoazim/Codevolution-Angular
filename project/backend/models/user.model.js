import 'dotenv/config'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            validate: {
                validator: function (value) {
                    return emailRegexPattern.test(value);
                },
                message: "please enter a valid email",
            },
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
            validate: {
                validator: function (value) {
                    return passwordRegexPattern.test(value);
                },
                message: "please enter a valid password (min 6 characters) with at least one uppercase letter, one lowercase letter, and one number",
            },
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        // profile: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Profile",
        // },
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
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
        }],
    },
    { timestamps: true }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed")
    console.log(this.password)
    next();
});

// create profile for user
// userSchema.post("save", async function (doc, next) {
//     if (!doc.profile) {
//         const ProfileModel = mongoose.model("Profile");
//         await ProfileModel.create({ user: doc._id, bio: "Hello, I am new here", followers: [] });
//     }
//     next();
// });

// sign access token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id, role:this.role }, process.env.ACCESS_TOKEN || "", {
        expiresIn: "5m",
    });
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id, role:this.role }, process.env.REFRESH_TOKEN || "", {
        expiresIn: "3d",
    });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
