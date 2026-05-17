import { body } from 'express-validator';

// createProductValidation

export const createProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('cost')
    .notEmpty()
    .withMessage('Cost is required')
    .isFloat({ gt: 0 })
    .withMessage('Cost must be a positive number'),

  body('image').optional().isURL().withMessage('Image URL must be valid'),

  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Category ID must be a valid MongoDB ObjectId'),

  body('barcode')
    .trim()
    .notEmpty()
    .withMessage('Barcode is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('Barcode must be between 8 and 20 characters'),

  body('isActive').optional().isBoolean().withMessage('IsActive must be boolean'),
];

// updateProductValidation
export const updateProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('cost')
    .notEmpty()
    .withMessage('Cost is required')
    .isFloat({ gt: 0 })
    .withMessage('Cost must be a positive number'),

  body('image').optional().isURL().withMessage('Image URL must be valid'),

  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Category ID must be a valid MongoDB ObjectId'),

  body('barcode')
    .trim()
    .notEmpty()
    .withMessage('Barcode is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('Barcode must be between 8 and 20 characters'),

  body('isActive').optional().isBoolean().withMessage('IsActive must be boolean'),
];

// deleteProductValidation

// getProductByIdValidation

// getProductsValidation

// searchProductValidation

// registerValidation
