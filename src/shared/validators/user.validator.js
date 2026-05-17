import { body } from 'express-validator';

// createUserValidation
export const createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be between 3 and 30 characters'),

  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('role').optional().isIn(['manager', 'admin', 'cashier']).withMessage('Invalid role'),
];

// loginValidation
export const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),

  body('password').notEmpty().withMessage('Password is required'),
];

// logoutValidation
export const logoutValidation = [];

// updateUserValidation

// deleteUserValidation

// getUserByIdValidation

// getUsersValidation
