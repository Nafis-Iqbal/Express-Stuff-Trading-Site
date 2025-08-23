
import { body } from "express-validator";

export const transactionCreateValidation = [
	body("listing_id")
		.isInt({ min: 1 }).withMessage("Listing ID must be a positive integer."),
	body("trade_id")
		.isInt({ min: 1 }).withMessage("Trade ID must be a positive integer."),
	body("buyer_id")
		.isInt({ min: 1 }).withMessage("Buyer ID must be a positive integer."),
	body("seller_id")
		.isInt({ min: 1 }).withMessage("Seller ID must be a positive integer."),
	body("amount")
		.isInt({ min: 1 }).withMessage("Amount must be a positive integer."),
];