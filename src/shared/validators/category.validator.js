import { body } from 'express-validator';
export const categoryValidation = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3 })
    .withMessage('Category name must be at least 3 characters long'),
  body('image').optional().isURL().withMessage('Image URL must be valid'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
];
