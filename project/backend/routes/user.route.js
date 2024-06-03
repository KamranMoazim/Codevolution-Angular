import express from "express";
import {
    getAllOrganisationsController,
    // activateUser,
    // deleteUser,
    getAllUsers,
    getMyProfileController,
    getUserInfo,
    loginUser,
    // logoutUser,
    registrationUser,
    // socialAuth,
    updatePassword,
    updateUserInfo,
    // updateProfilePicture,
    // updateUserInfo,
    // updateUserRole,
} from "../controllers/user.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { getEventsByUserIdController } from "../controllers/event.controller.js";
import { addingTempUser } from "../middlewares/temp.js";
const userRouter = express.Router();

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

// userRouter.post("/logout", isAutheticated, logoutUser);

// userRouter.get("/me", addingTempUser, getUserInfo);
// userRouter.get("/me", addingTempUser, getMyProfileController);

// userRouter.get("/user/events", getEventsByUserIdController);

// // userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAutheticated, updateUserInfo);

userRouter.get("/get-organisations", getAllOrganisationsController);

// userRouter.put("/update-user-password", isAutheticated, updatePassword);

// userRouter.get(
//     "/get-users",
//     isAutheticated,
//     authorizeRoles("admin"),
//     getAllUsers
// );

// userRouter.put(
//     "/update-user",
//     isAutheticated,
//     authorizeRoles("admin"),
//     updateUserRole
// );

// userRouter.delete(
//     "/delete-user/:id",
//     isAutheticated,
//     authorizeRoles("admin"),
//     deleteUser
// );

export default userRouter;
