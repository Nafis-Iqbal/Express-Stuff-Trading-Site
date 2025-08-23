
import { body } from "express-validator";
import { tradeStatus } from "../Types&Enums/Enums";

export const tradeCreateValidation = [
	body("listing_id")
		.isInt({ min: 1 }).withMessage("Listing ID must be a positive integer."),
	body("buyer_id")
		.isInt({ min: 1 }).withMessage("Buyer ID must be a positive integer."),
	body("seller_id")
		.isInt({ min: 1 }).withMessage("Seller ID must be a positive integer."),
	body("amount")
		.isInt({ min: 1 }).withMessage("Amount must be a positive integer."),
	body("status")
		.optional()
		.isIn(Object.values(tradeStatus)).withMessage(`Status must be one of: ${Object.values(tradeStatus).join(", ")}`),
];