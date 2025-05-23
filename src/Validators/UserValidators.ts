import { body } from "express-validator";
import { role } from "../Types&Enums/Enums";

export const createUserValidation = [
    body("email").exists().withMessage("No email entered.")
        .isEmail().withMessage("Invalid email format"),
    body("user_name").exists().withMessage("No username entered.")
        .isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
    body("password").exists().withMessage("No password entered.")
        .isLength({min: 6}).withMessage("Password is too short.")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/).withMessage("Password must contain atleast one letter and a digit"),
    body("password_confirmation").exists().withMessage("No confirm password entered")
        .custom((value, {req}) => value === req.body.password).withMessage("Passwords don't match")
];

export const loginUserValidation = [
    body("email").exists().withMessage("No email entered.")
        .isEmail().withMessage("Invalid email format"),
    body("password").exists().withMessage("No password entered."),
];

export const userDataValidation = [
    body("id").exists().withMessage("No id entered").isInt().withMessage("id must be an integer."),
    body("user_name").optional({ checkFalsy: true }).isString().withMessage("User name must be a string"),
    body("role").optional({ checkFalsy: true }).isIn(Object.values(role)).withMessage("role must be of types user, manager, admin"),
    body("bio").optional({ checkFalsy: true }).isString().withMessage("Bio must be a string"),
    body("profile_picture").optional({ checkFalsy: true }).isString().withMessage("Profile picture link must be a string"),
    body("rating").optional({ checkFalsy: true }).isNumeric().withMessage("Rating must be a number"),
    body("credits").optional({ checkFalsy: true }).isInt().withMessage("Credits must be an integer")
];