import { body, param, query } from "express-validator";

export const createProductValidation = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("cost")
    .notEmpty()
    .withMessage("Cost is required")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a non-negative number"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("barcode").trim().notEmpty().withMessage("Barcode is required"),

  body("currentStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Current stock must be a non-negative number"),

  body("reorderLevel")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Reorder level must be a non-negative number"),
];

export const updateProductValidation = () => [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost must be a non-negative number"),

  body("categoryId").optional().isMongoId().withMessage("Invalid category ID"),
];

export const deleteProductValidation = () => [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
];

export const getProductByIdValidation = () => [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
];

export const productSearchValidation = () => [
  query("name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Search term cannot be empty"),

  query("categoryId").optional().isMongoId().withMessage("Invalid category ID"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];
