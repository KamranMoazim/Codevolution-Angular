import express from "express";
import {
    addFollowerController, getMyProfileController, getProfileByIdController, updateProfileController
} from "../controllers/profile.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";

import { addingTempUser } from "../middlewares/temp.js";

const profileRouter = express.Router();


profileRouter.get("/profile/:id", getProfileByIdController);
profileRouter.get("/profile/me", addingTempUser, getMyProfileController);

profileRouter.put("/profile/:id", addingTempUser, updateProfileController);

profileRouter.put("/profile/:id/follow", addingTempUser, addFollowerController);
profileRouter.put("/profile/:id/unfollow", addingTempUser, addFollowerController);






export default profileRouter;
