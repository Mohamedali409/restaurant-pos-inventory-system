import { body } from "express-validator";

export const createStockLogValidation = () => [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["sale", "restock", "adjustment", "refund"])
    .withMessage("Invalid type"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("previousStock")
    .notEmpty()
    .withMessage("Previous stock is required")
    .isFloat({ min: 0 })
    .withMessage("Previous stock must be non-negative"),
  body("newStock")
    .notEmpty()
    .withMessage("New stock is required")
    .isFloat({ min: 0 })
    .withMessage("New stock must be non-negative"),
];

export const getStockLogsValidation = () => [];
