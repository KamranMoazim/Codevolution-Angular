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
import { generateFakeUsers, updateAdmins, updateAllEventsMedia, updateAllEventsDates } from "../controllers/dummy.controller.js";
const userRouter = express.Router();

// 'kamrannaseer765@gmail.com',
// 'kamranmoazim765@gmail.com',
// 'Stanford.Barrows@yahoo.com',
// 'Haven_Gottlieb@hotmail.com',
// 'Bonita34@yahoo.com',
// 'Nova_Schowalter36@hotmail.com',
// 'Fiona_Dooley@hotmail.com',
// 'Tyrel41@gmail.com'

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

// userRouter.get("/user-info", addingTempUser, getMyProfileController);
userRouter.get("/user-profile/:id", getUserProfileController);
userRouter.get("/user-info", isAutheticated, getMyProfileController);
userRouter.put("/user-info", isAutheticated, updateUserInfo);
// userRouter.put("/user-info", addingTempUser, updateUserInfo);

userRouter.get("/get-organizations", getAllOrganizationsController);

// userRouter.get("/generate-dummy-data", updateAllEventsDates);
// userRouter.get("/generate-dummy-data", updateAdmins);
// userRouter.get("/generate-dummy-data", updateAllEventsMedia);
// userRouter.get("/generate-dummy-data", generateFakeUsers);

export default userRouter;
