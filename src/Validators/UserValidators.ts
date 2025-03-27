import { body } from "express-validator";

export const createUserValidation = [
    body("email").exists().withMessage("No email entered.")
        .isEmail().withMessage("Invalid email format"),
    body("user_name").exists().withMessage("No username entered.")
        .isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
    body("password").exists().withMessage("No password entered.")
        .isLength({min: 6}).withMessage("Password is too short.")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/).withMessage("Password must contain atleast one letter and a digit"),
    body("confirmPassword").exists().withMessage("No confirm password entered")
        .custom((value, {req}) => value === req.body.password).withMessage("Passwords don't match")
];

export const loginUserValidation = [
    body("email").exists().withMessage("No email entered.")
        .isEmail().withMessage("Invalid email format"),
    body("password").exists().withMessage("No password entered.")
        .isLength({min: 6}).withMessage("Password is too short.")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/).withMessage("Password must contain atleast one letter and a digit"),
];

export const updateUserValidation = [

];