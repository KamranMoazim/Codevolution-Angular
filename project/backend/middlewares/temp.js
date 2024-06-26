
import { CatchAsyncError } from "./catchAsyncErrors.js";

// authenticated user
export const addingTempUser = CatchAsyncError(
    async (req, res, next) => {
        
        // console.log(req.cookies)

        // req.user = {
        //     tickets: [],
        //     _id: '664b0f9c17a961d3618c97b1',
        //     name: 'kamran',
        //     email: 'kamrannaseer765@gmail.com',
        //     password: '$2a$10$dlWmZpcOgDVOR5ynttQxpO8LcfQd9n98N5NphebhjpdxvbfnIW2v.',
        //     role: 'admin',
        //     createdAt: "2024-05-20T08:53:48.987Z",
        //     updatedAt: "2024-05-20T08:53:48.987Z",
        //     __v: 0
        // }

        req.user = {
            "_id": "665d8a93291ec7e2dcdc0182",
            "name": "kamran",
            "email": "kamrannaseer7654@gmail.com",
            "password": "$2a$10$g9ihCVPgLUbCXnVCs7lHKeQytg.Mb9BTLnICmKgxQpcNu6lx4.pFy",
            "role": "user",
            "tickets": [],
            "createdAt": "2024-05-23T12:01:30.486Z",
            "updatedAt": "2024-05-23T12:01:30.486Z",
            "__v": 0
        }

        next();
    }
);

// addingTempUser