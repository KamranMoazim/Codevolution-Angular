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
import { generateFakeUsers, updateAdmins, updateAllEventsMedia, updateAllEventsDates, getSimpleUsersMails } from "../controllers/dummy.controller.js";
const userRouter = express.Router();

// 'kamrannaseer765@gmail.com',
// 'kamranmoazim765@gmail.com',
// 'Stanford.Barrows@yahoo.com',
// 'Haven_Gottlieb@hotmail.com',
// 'Bonita34@yahoo.com',
// 'Nova_Schowalter36@hotmail.com',
// 'Fiona_Dooley@hotmail.com',
// 'Tyrel41@gmail.com'

// http://localhost:4200/events/668124c7b12a1ce6c7bc2ede   --- 'Tyrel41@gmail.com'


// "kamrannaseer7654@gmail.com",
// "Neha.Hammes@hotmail.com",
// "Juanita.Reilly33@gmail.com",
// "Arlie.Stark0@gmail.com",
// "Tre.Jacobson97@yahoo.com",
// "Gonzalo10@yahoo.com",
// "Adaline.Hane@yahoo.com",
// "Fern_Waters-Corkery82@hotmail.com",
// "Alexanne_Halvorson@hotmail.com",
// "Emma13@gmail.com",
// "Javier_Wyman@yahoo.com",
// "Bernhard.MacGyver36@yahoo.com",
// "Bailee63@yahoo.com",
// "Millie_Parisian@yahoo.com",
// "Sibyl_Wilkinson81@yahoo.com",
// "Collin_Oberbrunner@gmail.com",
// "Cleta88@yahoo.com",
// "Sadye.Mitchell@gmail.com",
// "Verlie.Mills@gmail.com",
// "Brock_Anderson@hotmail.com",
// "Maya.Harvey@hotmail.com",
// "Adriana.Hills@gmail.com",
// "Gino_Stark@hotmail.com",
// "Kaitlin53@hotmail.com",
// "Marcos88@hotmail.com",
// "Pearl70@gmail.com",
// "Madison_Smitham@yahoo.com",
// "Thalia71@yahoo.com",
// "Kellie_Renner8@yahoo.com",
// "Stephan80@yahoo.com",
// "Antonio90@yahoo.com",
// "Unique10@hotmail.com",
// "Baylee_Kling@hotmail.com"

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

// userRouter.get("/user-info", addingTempUser, getMyProfileController);
userRouter.get("/user-profile/:id", getUserProfileController);
userRouter.get("/user-info", isAutheticated, getMyProfileController);
userRouter.put("/user-info", isAutheticated, updateUserInfo);
// userRouter.put("/user-info", addingTempUser, updateUserInfo);

userRouter.get("/get-organizations", getAllOrganizationsController);

userRouter.get("/generate-dummy-data", getSimpleUsersMails);
// userRouter.get("/generate-dummy-data", updateAllEventsDates);
// userRouter.get("/generate-dummy-data", updateAdmins);
// userRouter.get("/generate-dummy-data", updateAllEventsMedia);
// userRouter.get("/generate-dummy-data", generateFakeUsers);

export default userRouter;
