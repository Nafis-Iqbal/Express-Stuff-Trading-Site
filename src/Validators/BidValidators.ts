
import { body } from "express-validator";

export const bidCreateValidation = [
	body("listing_id")
		.isInt({ min: 1 }).withMessage("Listing ID must be a positive integer."),
	body("description")
		.isString().withMessage("Description must be a string.")
		.isLength({ min: 1, max: 500 }).withMessage("Description is required and must be less than 500 characters."),
	body("amount")
		.isInt({ min: 1 }).withMessage("Amount must be a positive integer."),
	body("bidder_id")
		.isInt({ min: 1 }).withMessage("Bidder ID must be a positive integer."),
];