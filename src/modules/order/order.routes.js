// POST /api/orders
// GET /api/orders
// GET /api/orders/:id
// PUT /api/orders/:id/status
// POST /api/orders/:id/refund

// createOrderRoute
// getOrdersRoute
// getOrderByIdRoute
// refundOrderRoute
// updateOrderStatusRoute

import express from 'express';

import { protect } from '../../shared/middleware/auth.middleware.js';
import allowTo from '../../shared/middleware/role.middleware.js';
import validation from '../../shared/middleware/validation.middleware.js';

import {
  cancelOrderValidation,
  changeOrderStatusValidation,
  completeOrderValidation,
  createOrderValidation,
  deleteOrderValidation,
  getOrderByIdValidation,
  payOrderCashValidation,
  searchOrdersValidation,
  updateOrderValidation,
} from '../../shared/validators/order.validator.js';

import * as orderController from './order.controller.js';

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.get('/search', searchOrdersValidation, validation, orderController.searchOrders);

orderRouter.post('/', createOrderValidation, validation, orderController.createOrder);

orderRouter.get('/', orderController.getOrders);

orderRouter.get('/:orderId', getOrderByIdValidation, validation, orderController.getOrderById);

orderRouter.patch('/:orderId', updateOrderValidation, validation, orderController.updateOrder);

orderRouter.patch(
  '/:orderId/status',
  changeOrderStatusValidation,
  validation,
  orderController.changeOrderStatus,
);

orderRouter.patch(
  '/:orderId/complete',
  completeOrderValidation,
  validation,
  orderController.completeOrder,
);

orderRouter.patch(
  '/:orderId/cancel',
  cancelOrderValidation,
  validation,
  orderController.cancelOrder,
);

orderRouter.patch(
  '/:orderId/pay-cash',
  payOrderCashValidation,
  validation,
  orderController.payOrderCash,
);

orderRouter.delete(
  '/:orderId',
  allowTo('admin'),
  deleteOrderValidation,
  validation,
  orderController.deleteOrder,
);

export default orderRouter;
