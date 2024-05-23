import express from "express";
import { buyEventTicket } from "../controllers/ticket.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
const ticketRouter = express.Router();
import { addingTempUser } from "../middlewares/temp.js";

ticketRouter.post("/buy-ticket", addingTempUser, buyEventTicket);

export default ticketRouter;
