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
        avatar: {
            url: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
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
    next();
});

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
