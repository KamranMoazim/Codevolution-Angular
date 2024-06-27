import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { getLast30DaysTicketsBoughtAnalytics, eachStarCountAnalytics } from '../services/analytics.service.js';


export const getLast30DaysTicketsBoughtAnalyticsController = CatchAsyncError(
    async (req, res, next) => {
        try {

            console.log(req.params.id)
            
            const analysis = await getLast30DaysTicketsBoughtAnalytics(req.params.id);
            
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

            console.log(req.params.id)
            
            const analysis = await eachStarCountAnalytics(req.params.id);
            
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