import express from "express";
import {
    getAllOrganizationsController,
    getMyProfileController,
    getUserProfileController,
    loginUser,
    registrationUser,
    updateUserInfo
} from "../controllers/user.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { addingTempUser } from "../middlewares/temp.js";
const userRouter = express.Router();

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

// userRouter.get("/user-info", addingTempUser, getMyProfileController);
userRouter.get("/user-profile/:id", getUserProfileController);
userRouter.get("/user-info", isAutheticated, getMyProfileController);
userRouter.put("/user-info", addingTempUser, updateUserInfo);

userRouter.get("/get-organizations", getAllOrganizationsController);

export default userRouter;
