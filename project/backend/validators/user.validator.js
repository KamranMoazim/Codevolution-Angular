// const Joi = require('joi');

// const userSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).max(128).required(),
//     role: Joi.string().valid('admin', 'user').required()
// });


// export const validateUser = async (req, res, next) => {
//     const { error } = userSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.details[0].message
//         });
//     }
//     next();
// }




import Joi from "joi";
import ErrorHandler from "../utils/ErrorHandler.js";

import userModel from "../models/user.model.js"


const userSchema = Joi.object({
    name: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required().messages({
        'string.pattern.base': 'Please provide a valid full name',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a type of text",
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Please provide the user email",
    }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            "string.base": "Password should be a type of text",
            "string.empty": "Password cannot be an empty field",
            "string.min": "Password should have a minimum length of {#limit}",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            "any.required": "Please provide the user password"
        }),
    role: Joi.string().valid('admin', 'user').required().messages({
        "string.base": "Role should be a type of text",
        "string.empty": "Role cannot be an empty field",
        "any.required": "Please provide the user role",
        "any.only": "Role must be either admin or user"
    })
});

export const validateUserSchema = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        throw new ErrorHandler(error.details[0].message, 400)
    }

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
        throw new ErrorHandler("Email already exist", 400)
    }
};
