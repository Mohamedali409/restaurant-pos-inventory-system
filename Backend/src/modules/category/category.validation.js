import { body } from "express-validator";
import { idValidation } from "../../shared/validators/common.validator.js";

export const createCategoryValidation = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 60 })
    .withMessage("Name must be 2-60 characters"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const updateCategoryValidation = () => [
  idValidation("categoryId"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("Name must be 2-60 characters"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const deleteCategoryValidation = () => [idValidation("categoryId")];
export const getCategoryByIdValidation = () => [idValidation("categoryId")];
