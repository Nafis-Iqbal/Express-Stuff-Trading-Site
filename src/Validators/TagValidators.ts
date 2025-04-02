import { body } from "express-validator";

export const tagDataValidation = [
    body("title").exists().withMessage("Must enter tag title")
        .isLength({min:3, max:10}).withMessage("Tag title must be within 3-10 letters")
]