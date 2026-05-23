// getSettingsValidation
// updateSettingsValidation

import { body } from "express-validator";

export const updateSettingsValidation = () => [
  body("storeName")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Store name must be 1-100 characters"),
  body("address").optional().trim(),
  body("phone")
    .optional()
    .trim()
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage("Invalid Egyptian phone number"),
  body("taxRate")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax rate must be between 0 and 100"),
  body("currency")
    .optional()
    .trim()
    .isLength({ min: 2, max: 5 })
    .withMessage("Invalid currency code"),
  body("receiptFooter")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Footer must be under 200 characters"),
];
