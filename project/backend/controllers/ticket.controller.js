import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { getEventById } from "../services/event.service.js";
import { checkIfUserHasTicket, purchaseTicket, returnTicket } from '../services/ticket.service.js';






// buy event ticket
export const buyEventTicket = CatchAsyncError(
    async (req, res, next) => {
        try {

            const event = await getEventById(req.body.eventId);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            if(event.status === "past"){
                return next(new ErrorHandler("Event is already past", 400));
            }

            // console.log(event)

            // check if tickets are available
            const ticketsAvailable = event.capacity - event.tickets.length;

            if(ticketsAvailable <= 0){
                return next(new ErrorHandler("Tickets are not available", 400));
            }

            // check if user has already buyed ticket for this event
            // const isTicketBuyed = await checkIfUserHasTicket(req.body.eventId, req.user._id)
            const isTicketBuyed = await checkIfUserHasTicket(req.user._id, req.body.eventId)


            // console.log(isTicketBuyed)

            if(isTicketBuyed !== null){
                return next(new ErrorHandler("You have already bought ticket for this event", 400));
            }

            const ticketData = {
                user: req.user._id,
                event: req.body.eventId,
                price: event.ticketPrice,
            };

            const boughtTicket = await purchaseTicket(ticketData);


            return res.status(201).json({
                success: true,
                message: "Ticket bought successfully"
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);





// return event ticket
export const returnEventTicket = CatchAsyncError(
    async (req, res, next) => {
        try {
            // Retrieve the event by ID
            const event = await getEventById(req.body.eventId);

            console.log(event)

            if (!event) {
                return next(new ErrorHandler("Event not found", 400));
            }

            // // Check if the user has purchased a ticket for this event
            // const ticket = await ticketModel.findOne({
            //     event: req.body.eventId,
            //     user: req.user._id
            // });

            // if (!ticket) {
            //     return next(new ErrorHandler("You have not purchased a ticket for this event", 400));
            // }


            const isTicketBuyed = await checkIfUserHasTicket(req.user._id, req.body.eventId)

            console.log(isTicketBuyed)

            if(isTicketBuyed === null){
                return next(new ErrorHandler("You have not purchased a ticket for this event", 400));
            }

            const k = await returnTicket(isTicketBuyed._id)

            console.log(k)

            return res.status(200).json({
                success: true,
                message: "Ticket returned successfully"
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
