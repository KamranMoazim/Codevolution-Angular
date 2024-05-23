import express from "express";
import {
    // activateUser,
    // deleteUser,
    getAllUsers,
    getUserInfo,
    loginUser,
    // logoutUser,
    registrationUser,
    // socialAuth,
    updatePassword,
    // updateProfilePicture,
    // updateUserInfo,
    // updateUserRole,
} from "../controllers/user.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { getEventsByUserIdController } from "../controllers/event.controller.js";
const userRouter = express.Router();

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

// userRouter.post("/logout", isAutheticated, logoutUser);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.get("/user/events", getEventsByUserIdController);

// // userRouter.post("/social-auth", socialAuth);

// userRouter.put("/update-user-info",isAutheticated, updateUserInfo);

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
