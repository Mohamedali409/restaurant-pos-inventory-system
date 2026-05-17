import { body, param, query } from 'express-validator';

/* createOrderValidation */
export const createOrderValidation = [
  body('customerName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Customer name must be between 2 and 50 characters'),

  body('orderType')
    .optional()
    .isIn(['dine-in', 'takeaway', 'delivery'])
    .withMessage('Invalid order type'),

  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),

  body('items.*.productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid Product ID'),

  body('items.*.quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('discount').optional().isFloat({ min: 0 }).withMessage('Discount cannot be negative'),

  body('tax').optional().isFloat({ min: 0 }).withMessage('Tax cannot be negative'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['cash', 'card', 'wallet'])
    .withMessage('Invalid payment method'),

  body('tableNumber')
    .if(body('orderType').equals('dine-in'))
    .notEmpty()
    .withMessage('Table number is required')
    .isInt({ min: 1 })
    .withMessage('Table number must be greater than 0'),

  body('deliveryAddress')
    .if(body('orderType').equals('delivery'))
    .notEmpty()
    .withMessage('Delivery address is required'),

  body('phone')
    .if(body('orderType').equals('delivery'))
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage('Invalid Egyptian phone number'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Notes cannot exceed 300 chars'),
];

/* updateOrderValidation */
export const updateOrderValidation = [
  param('id').isMongoId().withMessage('Invalid Order ID'),

  body('customerName').optional().trim(),

  body('discount').optional().isFloat({ min: 0 }).withMessage('Discount cannot be negative'),

  body('tax').optional().isFloat({ min: 0 }).withMessage('Tax cannot be negative'),

  body('notes').optional().isLength({ max: 300 }).withMessage('Notes too long'),
];

/* getOrderByIdValidation */

export const getOrderByIdValidation = [param('id').isMongoId().withMessage('Invalid Order ID')];

/* deleteOrderValidation */
export const deleteOrderValidation = [param('id').isMongoId().withMessage('Invalid Order ID')];

/* changeOrderStatusValidation */
export const changeOrderStatusValidation = [
  param('id').isMongoId().withMessage('Invalid Order ID'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'preparing', 'completed', 'cancelled'])
    .withMessage('Invalid order status'),
];

/* cancelOrderValidation */
export const cancelOrderValidation = [param('id').isMongoId().withMessage('Invalid Order ID')];

/* completeOrderValidation */
export const completeOrderValidation = [param('id').isMongoId().withMessage('Invalid Order ID')];

/* payOrderCashValidation */
export const payOrderCashValidation = [param('id').isMongoId().withMessage('Invalid Order ID')];

/* searchOrdersValidation */
export const searchOrdersValidation = [
  query('term').trim().notEmpty().withMessage('Search term is required'),
];
