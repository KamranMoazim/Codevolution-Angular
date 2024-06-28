import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { getEventById } from "../services/event.service.js";
import { checkIfUserHasTicket, purchaseTicket } from '../services/ticket.service.js';






// buy event ticket
export const buyEventTicket = CatchAsyncError(
    async (req, res, next) => {
        try {

            const event = await getEventById(req.body.eventId);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            // console.log(event)

            // check if tickets are available
            const ticketsAvailable = event.capacity - event.tickets.length;

            if(ticketsAvailable <= 0){
                return next(new ErrorHandler("Tickets are not available", 400));
            }

            // check if user has already buyed ticket for this event
            const isTicketBuyed = checkIfUserHasTicket(req.body.eventId, req.user._id)

            if(isTicketBuyed !== null){
                return next(new ErrorHandler("You have already buyed ticket for this event", 400));
            }

            const ticketData = {
                user: req.user._id,
                event: req.body.eventId,
                price: event.ticketPrice,
            };

            const boughtTicket = await purchaseTicket(ticketData);

            // console.log(boughtTicket)

            return res.status(201).json({
                success: true,
                message: "Ticket bought successfully"
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
