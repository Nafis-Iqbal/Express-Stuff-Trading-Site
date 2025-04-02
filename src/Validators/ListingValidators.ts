import { body } from "express-validator";

export const listingCreateValidation = [
    body("title").exists().withMessage("Must enter listing name")
        .isString().withMessage("Listing name must be a string"),
    body("description").exists().withMessage("Must enter listing description")
        .isString().withMessage("Listing description must be a string")
        .isLength({min:5, max:30}).withMessage("Listing description must be within range of 5-30"),
    body("location").exists().withMessage("Must enter listing location")
        .isString().withMessage("Listing location must be a string")
        .isLength({min:2, max:30}).withMessage("Listing description must be within range of 2-30"),
    body("exchange_items").exists().withMessage("Must enter exhange items")
        .isString().withMessage("Exchange items must be a string")
        .isLength({min:3, max:30}).withMessage("Items description must be within range of 3-30"),
]

export const listingUpdateValidation = [
    body("title").optional().isString().withMessage("Listing name must be a string"),
    body("description").optional().isString().withMessage("Listing description must be a string")
        .isLength({min:5, max:30}).withMessage("Listing description must be within range of 5-30"),
    body("location").optional().isString().withMessage("Listing location must be a string")
        .isLength({min:2, max:30}).withMessage("Listing description must be within range of 2-30"),
    body("exchange_items").optional().isString().withMessage("Exchange items must be a string")
        .isLength({min:3, max:30}).withMessage("Items description must be within range of 3-30"),
    body("status").optional().isIn(["sold", "available", "cancelled"]).withMessage("Status must be a valid listing Status type"),
]

export const tagArrayValidation = (id_key: string) => [
    body(id_key)
        .isArray().withMessage(`${id_key} must be an array`)
        .custom((value: any[]) => {
            if (!value.every(item => typeof item === "number")) {
                throw new Error(`${id_key} must contain only numbers`);
            }
            return true;
        })
]