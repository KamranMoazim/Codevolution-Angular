import 'dotenv/config'
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
// import ejs from "ejs";
// import path from "path";
// import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt.js";
// import { redis } from "../utils/redis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../services/user.service.js";





// register user

export const registrationUser = CatchAsyncError(
    async (req, res, next) => {
        try {
            
            const { name, email, password, role } = req.body;

            const isEmailExist = await userModel.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exist", 400));
            }

            // const user = {
            //     name,
            //     email,
            //     password,
            //     role
            // };

            // const activationToken = createActivationToken(user);

            // const activationCode = activationToken.activationCode;

            // const data = { user: { name: user.name }, activationCode };
            // const html = await ejs.renderFile(
            //     path.join(__dirname, "../mails/activation-mail.ejs"),
            //     data
            // );

            const user = await userModel.create({
                name,
                email,
                password,
                role
            });

            try {
                // await sendMail({
                //     email: user.email,
                //     subject: "Activate your account",
                //     template: "activation-mail.ejs",
                //     data,
                // });

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

            if (!user) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }

            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }
            sendToken(user, 200, res);
        } catch (error) {

            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// logout user
export const logoutUser = CatchAsyncError(
    async (req, res, next) => {
        try {
            res.cookie("access_token", "", { maxAge: 1 });
            res.cookie("refresh_token", "", { maxAge: 1 });
            const userId = req.user?._id || "";
            console.log(userId)
            // redis.del(userId);
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// update access token
export const updateAccessToken = CatchAsyncError(
    async (req, res, next) => {
        try {
            const refresh_token = req.cookies.refresh_token;
            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN
            );

            const message = "Could not refresh token";
            if (!decoded) {
                return next(new ErrorHandler(message, 400));
            }
            // const session = await redis.get(decoded.id);

            // if (!session) {
            //     return next(
            //         new ErrorHandler("Please login for access this resources!", 400)
            //     );
            // }

            // const user = JSON.parse(session);
            const user = {
                _id: decoded.id
            }

            const accessToken = jwt.sign(
                { id: user._id },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: "5m",
                }
            );

            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_TOKEN,
                {
                    expiresIn: "3d",
                }
            );

            // req.user = user;

            res.cookie("access_token", accessToken, accessTokenOptions);
            res.cookie("refresh_token", refreshToken, refreshTokenOptions);

            // await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days

            return next();
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// get user info
export const getUserInfo = CatchAsyncError(
    async (req, res, next) => {
        try {
            const userId = req.user?._id;
            getUserById(userId, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);





// update user info

export const updateUserInfo = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { name } = req.body;

            const userId = req.user?._id;
            const user = await userModel.findById(userId);

            if (name && user) {
                user.name = name;
            }

            await user?.save();

            await redis.set(userId, JSON.stringify(user));

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// update user password

export const updatePassword = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return next(new ErrorHandler("Please enter old and new password", 400));
            }

            const user = await userModel.findById(req.user?._id).select("+password");

            if (user?.password === undefined) {
                return next(new ErrorHandler("Invalid user", 400));
            }

            const isPasswordMatch = await user?.comparePassword(oldPassword);

            if (!isPasswordMatch) {
                return next(new ErrorHandler("Invalid old password", 400));
            }

            user.password = newPassword;

            await user.save();

            await redis.set(req.user?._id, JSON.stringify(user));

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);





// get all users --- only for admin
export const getAllUsers = CatchAsyncError(
    async (req, res, next) => {
        try {
            getAllUsersService(res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// update user role --- only for admin
export const updateUserRole = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { email, role } = req.body;
            const isUserExist = await userModel.findOne({ email });
            if (isUserExist) {
                const id = isUserExist._id;
                updateUserRoleService(res, id, role);
            } else {
                res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Delete user --- only for admin
export const deleteUser = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userModel.findById(id);

            if (!user) {
                return next(new ErrorHandler("User not found", 404));
            }

            await user.deleteOne({ id });

            await redis.del(id);

            res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
