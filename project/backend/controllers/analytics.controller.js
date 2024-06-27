import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    getLast30DaysTicketsBoughtAnalytics, 
    eachStarCountAnalytics,
    numberOfEventsCreatedInLast12MonthsByUserAnalytics,
    allEventsByUserUniqueCategoriesByCountAnalytics,
    // mostEventTimeOfDayAnalytics
    totalRevenueAnalytics
} from '../services/analytics.service.js';


export const getLast30DaysTicketsBoughtAnalyticsController = CatchAsyncError(
    async (req, res, next) => {
        try {

            // console.log(req.params.id)
            const eventId = req.params.id;
            
            const analysis = await getLast30DaysTicketsBoughtAnalytics(eventId);
            
            return res.status(200).json({
                success: true,
                data:{
                    analysis
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);



export const eachStarCountAnalyticsController = CatchAsyncError(
    async (req, res, next) => {
        try {

            // console.log(req.params.id)
            const eventId = req.params.id;
            
            const analysis = await eachStarCountAnalytics(eventId);
            
            return res.status(200).json({
                success: true,
                data:{
                    analysis
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);















export const numberOfEventsCreatedInLast12MonthsByUserController = CatchAsyncError(
    async (req, res, next) => {
        try {

            console.log(req.user._id)
            
            const analysis = await numberOfEventsCreatedInLast12MonthsByUserAnalytics(req.user._id);
            
            return res.status(200).json({
                success: true,
                data:{
                    analysis
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


export const allEventsByUserUniqueCategoriesByCountAnalyticsController = CatchAsyncError(
    async (req, res, next) => {
        try {

            console.log(req.user._id)
            
            const analysis = await allEventsByUserUniqueCategoriesByCountAnalytics(req.user._id);
            
            return res.status(200).json({
                success: true,
                data:{
                    analysis
                },
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// export const mostEventTimeOfDayController = CatchAsyncError(
//     async (req, res, next) => {
//         try {
            
//             const analysis = await mostEventTimeOfDayAnalytics(req.user._id);
            
//             return res.status(200).json({
//                 success: true,
//                 data:{
//                     analysis
//                 },
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 400));
//         }
//     }
// );


export const totalRevenueAnalyticsController = CatchAsyncError(
    async (req, res, next) => {
        try {
            
            const analysis = await totalRevenueAnalytics(req.user._id);
            
            return res.status(200).json({
                success: true,
                data:analysis
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);