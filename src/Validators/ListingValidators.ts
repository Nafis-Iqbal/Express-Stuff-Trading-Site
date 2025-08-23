import { body } from "express-validator";

export const listingCreateValidation = [
    body("title").exists().withMessage("Must enter listing name")
        .isString().withMessage("Listing name must be a string"),
    body("description").exists().withMessage("Must enter listing description")
        .isString().withMessage("Listing description must be a string")
        .isLength({min:5, max:100}).withMessage("Listing description must be within range of 5-100"),
    body("location").exists().withMessage("Must enter listing location")
        .isString().withMessage("Listing location must be a string")
        .isLength({min:2, max:30}).withMessage("Listing description must be within range of 2-30"),
    body("exchange_items").exists().withMessage("Must enter exhange items")
        .isString().withMessage("Exchange items must be a string")
        .isLength({min:3, max:60}).withMessage("Items description must be within range of 3-60"),
    body("imageURLs")
        .optional({ checkFalsy: true })
        .isArray().withMessage("imageURLs must be an array")
        .custom((value) => {
            if (!Array.isArray(value)) return false;
            for (const url of value) {
                if (typeof url !== "string" || !/^https?:\/\/.+\..+/.test(url)) {
                    throw new Error("Each imageURL must be a valid URL string");
                }
            }
            return true;
        }),
]

export const listingUpdateValidation = [
    body("title").optional({ checkFalsy: true }).isString().withMessage("Listing name must be a string"),
    body("description").optional({ checkFalsy: true }).isString().withMessage("Listing description must be a string")
        .isLength({min:5, max:100}).withMessage("Listing description must be within range of 5-100"),
    body("location").optional({ checkFalsy: true }).isString().withMessage("Listing location must be a string")
        .isLength({min:2, max:30}).withMessage("Listing description must be within range of 2-30"),
    body("exchange_items").optional({ checkFalsy: true }).isString().withMessage("Exchange items must be a string")
        .isLength({min:5, max:60}).withMessage("Items description must be within range of 5-60"),
    body("status").optional({ checkFalsy: true }).isIn(["sold", "available", "cancelled"]).withMessage("Status must be a valid listing Status type"),
    body("imageURLs")
        .optional({ checkFalsy: true })
        .isArray().withMessage("imageURLs must be an array")
        .custom((value) => {
            if (!Array.isArray(value)) return false;
            for (const url of value) {
                if (typeof url !== "string" || !/^https?:\/\/.+\..+/.test(url)) {
                    throw new Error("Each imageURL must be a valid URL string");
                }
            }
            return true;
        }),
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

export const deleteImagesValidation = [
    body("listing_id")
        .isInt({ min: 1 }).withMessage("Listing ID must be a positive integer."),
    body("imageIds")
        .isArray({ min: 1 }).withMessage("Image IDs must be a non-empty array.")
        .custom((value) => {
            if (!Array.isArray(value) || !value.every(id => Number.isInteger(id) && id > 0)) {
                throw new Error("All image IDs must be positive integers.");
            }
            return true;
        }),
]