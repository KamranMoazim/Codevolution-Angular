// import { redis } from "../utils/redis";
import profileModel from "../models/profile.model.js";
import userModel from "../models/user.model.js";


// getting user profile
export const getMyProfile = async (userId) => {
    return await profileModel.findOne({ user: userId });
}

// getting profile by id
export const getProfileById = async (profileId) => {
    let profile = await profileModel.findById(profileId);

    // if (!profile) {
    //     // create new profile
    //     profile = await profileModel.create({ user: profileId, bio: "Hello, I am new here", followers: [] });
    //     // update user profile
    //     await userModel.findOne({ _id: profileId }).updateOne({ profile: profile._id });
    // }

    return profile;
}

// updating profile
export const updateProfile = async (profileData) => {
    return await profileModel.findOne({ _id: profileData.id }).updateOne(profileData);
}

// add follower to profile followers list
export const addFollower = async (profileId, followerId) => {
    return await profileModel.findOne({ _id: profileId }).updateOne({ $push: { followers: followerId } });
}

// remove follower from profile followers list
export const removeFollower = async (profileId, followerId) => {
    return await profileModel.findOne({ _id: profileId }).updateOne({ $pull: { followers: followerId } });
}