
import { body } from "express-validator";

export const ratingCreateValidation = [
	body("rating")
		.isFloat({ min: 0, max: 5 }).withMessage("Rating must be a number between 0 and 5."),
	body("listing_id")
		.isInt({ min: 1 }).withMessage("Listing ID must be a positive integer."),
	body("trade_id")
		.isInt({ min: 1 }).withMessage("Trade ID must be a positive integer."),
	body("rating_giver_id")
		.isInt({ min: 1 }).withMessage("Rating giver ID must be a positive integer."),
	body("rating_taker_id")
		.isInt({ min: 1 }).withMessage("Rating taker ID must be a positive integer."),
	body("comment")
		.isString().withMessage("Comment must be a string.")
		.isLength({ max: 500 }).withMessage("Comment must be less than 500 characters."),
];