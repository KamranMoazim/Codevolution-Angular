import 'dotenv/config'
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt.js";
import { getAllOrganizationsService } from "../services/user.service.js";





// register user
export const registrationUser = CatchAsyncError(
    async (req, res, next) => {
        try {
            
            const { name, email, password, role } = req.body;

            const isEmailExist = await userModel.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exist", 400));
            }

            const user = await userModel.create({
                name,
                email,
                password,
                role,
                bio: "Hello, I am new here",
                avatar: "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
            });

            try {

                res.status(201).json({
                    success: true,
                    message: `User registered successfully`
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 400));
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);




// Login user
export const loginUser = CatchAsyncError(
    async (req, res, next) => {
        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please enter email and password", 400));
            }

            const user = await userModel.findOne({ email }).select("+password");

            // console.log(user);

            if (!user) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }

            const isPasswordMatch = await user.comparePassword(password);
            // console.log(isPasswordMatch);
            if (!isPasswordMatch) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }
            sendToken(user, 200, res);
        } catch (error) {

            return next(new ErrorHandler(error.message, 400));
        }
    }
);



// update access token
export const updateAccessToken = CatchAsyncError(
    async (req, res, next) => {
        try {
            // const refresh_token = req.cookies.refresh_token;
            // const decoded = jwt.verify(
            //     refresh_token,
            //     process.env.REFRESH_TOKEN
            // );

            // const message = "Could not refresh token";
            // if (!decoded) {
            //     return next(new ErrorHandler(message, 400));
            // }

            // const user = JSON.parse(session);
            // const user = {
            //     _id: decoded.id
            // }

            const accessToken = jwt.sign(
                { id: req.user._id },
                process.env.ACCESS_TOKEN,
                {
                    // expiresIn: "5m",
                    expiresIn: "3d",
                }
            );

            // const refreshToken = jwt.sign(
            //     { id: user._id },
            //     process.env.REFRESH_TOKEN,
            //     {
            //         expiresIn: "3d",
            //     }
            // );

            // req.user = user;

            res.cookie("access_token", accessToken, accessTokenOptions);
            // res.cookie("refresh_token", refreshToken, refreshTokenOptions);

            // await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days

            return next();
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// getting my profile
export const getMyProfileController = CatchAsyncError(async (req, res, next) => {
    // const profile = await getMyProfile(req.user._id);
    res.status(200).json({
        success: true,
        data:{
            profile: await userModel.findOne({ _id: req.user._id })
        }
    });
});





export const updateUserInfo = CatchAsyncError(
    async (req, res, next) => {
        try {

            const user = await userModel.findById(req.user?._id);

            if (!user) {
                return next(new ErrorHandler("User not found", 400));
            }

            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.avatar = req.body.avatar || user.avatar;

            await user.save();

            res.status(200).json({
                success: true,
                message: "User updated successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);



export const getAllOrganizationsController = CatchAsyncError(
    async (req, res, next) => {
        try {
            const search = req.query.search || "";
            const pageNo = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.limit) || 5;

            res.status(200).json({
                success: true,
                message: "All organizations",
                data: await getAllOrganizationsService(search, pageNo, pageSize)
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);