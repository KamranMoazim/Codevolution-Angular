import express from "express";
import {
    getAllOrganizationsController,
    getMyProfileController,
    loginUser,
    registrationUser,
    updateUserInfo
} from "../controllers/user.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { addingTempUser } from "../middlewares/temp.js";
const userRouter = express.Router();

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

userRouter.get("/user-info", addingTempUser, getMyProfileController);
userRouter.put("/user-info", addingTempUser, updateUserInfo);

userRouter.get("/get-organizations", getAllOrganizationsController);

export default userRouter;
