
import jwt from "jsonwebtoken";

import { CatchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
// import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";

// authenticated user
export const isAutheticatedPartial = CatchAsyncError(
    async (req, res, next) => {
        
        // console.log(req.headers)
        
        // const access_token = req.cookies.access_token;
        // console.log(req.headers.cookie)
        // const access_token = req.headers.cookie.split("=")[1];

        if(!req.headers.cookie || !req.headers.cookie.includes("access_token")){
            return next()
        }

        // cookies can contain multiple key-value pairs
        // so we need to split the cookie string by ";" and then by "="
        const access_token = req.headers.cookie.split(";").find(c => c.trim().startsWith("access_token=")).split("=")[1];
        // console.log(access_token)


        if (!access_token) {
            return next(
                new ErrorHandler("Please login to access this resource", 400)
            );
        }

        const decoded = jwt.decode(access_token);

        // console.log("decoded")
        // console.log(decoded)
        
        if (!decoded) {
            return next(new ErrorHandler("access token is not valid", 400));
        }

        const user = await userModel.findById(decoded.id).select("+password");

        req.user = user;

        // check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) { // 1000ms = 1s
            try {
                await updateAccessToken(req, res, next);
            } catch (error) {
                return next(error);
            }
        } else {

            next();
        }
    }
);