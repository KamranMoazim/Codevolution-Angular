import express from "express";
import { buyEventTicket } from "../controllers/ticket.controller.js";
// import { authorizeRoles, isAutheticated } from "../middlewares/auth.js";
import { addingTempUser } from "../middlewares/temp.js";

const ticketRouter = express.Router();

ticketRouter.post("/buy-ticket", addingTempUser, buyEventTicket);

export default ticketRouter;
