import { query } from "express-validator";

export const idValidation = (id_key: string) => [
    query(id_key).exists().withMessage("No " + id_key + " entered")
        .isInt().withMessage(id_key + " must be integer"),
]
