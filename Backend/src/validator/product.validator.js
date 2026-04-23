import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    next();
}

export const createProductValidator =[
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
        .custom((value, { req }) => Boolean(value || req.body?.decription))
        .withMessage("Description is required"),
    body("priceAmount").notEmpty().withMessage("Price amount is required").bail()
        .isNumeric().withMessage("Price amount must be a number"),
    validateRequest
]