import express from "express";
import {
    createEventController, getAllEventsController, updateEventController, getEventController, 
    getEventsByUserIdController, getPersonsWhoBoughtTicketController, getTopEventsController
    ,test,
    searchEventsController, fetchEventsController
} from "../controllers/event.controller.js";
import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";

import { addingTempUser } from "../middlewares/temp.js";

const eventRouter = express.Router();


eventRouter.get("/event/test", addingTempUser, test);

eventRouter.get("/event/analytics/:id", addingTempUser, getEventsByUserIdController);
eventRouter.get("/event/analytics/event/:id", addingTempUser, getEventsByUserIdController);


// eventRouter.get("/event/search", searchEventsController);
eventRouter.get("/event/top", getTopEventsController);
eventRouter.get("/event/admin-posted-events", getTopEventsController);
eventRouter.get("/event/my-events", getTopEventsController);

eventRouter.get("/event/:id/persons", getPersonsWhoBoughtTicketController);
eventRouter.get("/event/:id", getEventController);
// eventRouter.get("/event", getAllEventsController);
eventRouter.get("/event", fetchEventsController);
eventRouter.post("/event", addingTempUser, createEventController);
eventRouter.put("/event/:id", addingTempUser, updateEventController); 




// eventRouter.post("/logout", isAutheticated, logoutUser);

// eventRouter.get("/me", isAutheticated, getUserInfo);


// eventRouter.put("/update-user-info",isAutheticated, updateUserInfo);

// eventRouter.put("/update-user-password", isAutheticated, updatePassword);

// eventRouter.get(
//     "/get-users",
//     isAutheticated,
//     authorizeRoles("admin"),
//     getAllUsers
// );

// eventRouter.put(
//     "/update-user",
//     isAutheticated,
//     authorizeRoles("admin"),
//     updateUserRole
// );

// eventRouter.delete(
//     "/delete-user/:id",
//     isAutheticated,
//     authorizeRoles("admin"),
//     deleteUser
// );

export default eventRouter;
