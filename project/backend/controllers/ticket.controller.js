import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { createEventReview, getReviewById } from '../services/review.service.js';
import { createReviewValidator } from '../validators/review.validator.js';
import { 
    createEvent, getAllEvents, updateEvent, getEventById, 
    getEventsByUserId, getEventsByUser, getEventsSoldTickets, 
    getEventsAvailableTickets, getEventsByStatusOfParticularUser,
} from "../services/event.service.js";
import { purchaseTicket } from '../services/ticket.service.js';






// buy event ticket
export const buyEventTicket = CatchAsyncError(
    async (req, res, next) => {
        try {

            const event = await getEventById(req.body.eventId);

            if(!event){
                return next(new ErrorHandler("Event not found", 400));
            }

            // check if tickets are available
            const ticketsAvailable = event.capacity - event.tickets.length;

            if(ticketsAvailable <= 0){
                return next(new ErrorHandler("Tickets are not available", 400));
            }

            // check if user has already buyed ticket for this event
            const isTicketBuyed = event.tickets.find(
                ticket => ticket.userId.toString() === req.body.userId.toString()
            );

            if(isTicketBuyed){
                return next(new ErrorHandler("You have already buyed ticket for this event", 400));
            }

            const ticketData = {
                userId: req.body.userId,
                eventId: req.body.eventId,
                ticketPrice: event.ticketPrice,
            };

            const boughtTicket = purchaseTicket(ticketData);

            return res.status(201).json({
                success: true,
                message: "Ticket bought successfully",
                data:{
                    boughtTicket
                },
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
