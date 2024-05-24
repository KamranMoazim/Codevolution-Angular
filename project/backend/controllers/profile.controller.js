import 'dotenv/config'
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { 
    addFollower, getMyProfile, getProfileByUserId, updateProfile,
    removeFollower
} from "../services/profile.service.js";









// getting profile by id
export const getProfileByUserIdController = CatchAsyncError(async (req, res, next) => {
    const profile = await getProfileByUserId(req.params.id);
    if (!profile) {
        return next(new ErrorHandler("Profile not found", 404));
    }
    res.status(200).json({
        success: true,
        data:{profile}
    });
});

// updating profile
export const updateProfileController = CatchAsyncError(async (req, res, next) => {
    const profileData = {
        id: req.params.id,
        ...req.body
    }
    const profile = await updateProfile(profileData);
    res.status(200).json({
        success: true,
        profile
    });
});

// adding follower to profile
export const addFollowerController = CatchAsyncError(async (req, res, next) => {
    const profile = await addFollower(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        message: "Followed Successfully",
        data:{profile}
    });
});

// removing follower from profile
export const removeFollowerController = CatchAsyncError(async (req, res, next) => {
    const profile = await removeFollower(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        message: "Unfollowed Successfully",
        data:{profile}
    });
});