import { query } from "express-validator";

export const salesChartValidation = () => [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid ISO date"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid ISO date"),
];

export const topProductsValidation = () => [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];
