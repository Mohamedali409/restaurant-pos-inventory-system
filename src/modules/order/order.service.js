// إنشاء الطلبات
// خصم المخزون
// حساب الفاتورة

// أهم Logic هنا:
// calculate total
// apply discount
// deduct stock
// create order
// create stock log

/* Functions */
// createOrderService -- Done
// getOrdersService -- Done
// getOrderByIdService -- Done
// updateOrderService -- Done
// changeOrderStatusService -- Done
// cancelOrderService -- Done
// completeOrderService -- Done
// payOrderCashService --TODO

// deductStockService
// refundOrderService

import mongoose from 'mongoose';
import AppError from '../../shared/utils/AppError.js';
import { calculateOrderTotal } from '../../shared/utils/calcTotals.js';
import { getNextOrderNumber } from '../counter/counter.reository.js';
import * as productRepository from '../product/product.repository.js';
import * as OrderRepository from './order.repository.js';

const allowedStatuses = ['pending', 'preparing', 'completed', 'cancelled'];

const createOrderService = async (orderData) => {
  const orderNumber = await getNextOrderNumber();

  const discount = orderData.discount || 0;
  const tax = orderData.tax || 0;

  if (!Array.isArray(orderData.items)) {
    throw new AppError('items must be an array', 400);
  }

  if (orderData.items.length === 0) {
    throw new AppError('Order items are required', 400);
  }

  const itemsWithSnapshot = [];

  for (const item of orderData.items) {
    const product = await productRepository.findProductById(item.productId);

    if (!product) {
      throw new AppError(`Product ${item.productId} not found`, 404);
    }

    itemsWithSnapshot.push({
      productId: product._id,
      nameSnapshot: product.name,
      priceSnapshot: product.price,
      quantity: item.quantity,
      subtotal: product.price * item.quantity,
    });
  }

  const { subtotal, total } = calculateOrderTotal({
    items: itemsWithSnapshot,
    discount,
    tax,
  });

  const order = await OrderRepository.createOrder({
    ...orderData,
    items: itemsWithSnapshot,
    subtotal,
    total,
    orderNumber,
  });

  return order;
};

const getOrdersService = async (query) => {
  const { page = 1, limit = 10 } = query;

  const { orders, total } = await OrderRepository.findOrders({
    page,
    limit,
  });

  return {
    data: orders,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getOrderByIdService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid order ID', 400);
  }

  const order = await OrderRepository.findOrderById(orderId);

  if (!order) throw new AppError('Order not found', 404);

  return order;
};

const updateOrderService = async (orderId, orderData) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid order ID', 400);
  }

  const existingOrder = await OrderRepository.findOrderById(orderId);

  if (!existingOrder) {
    throw new AppError('Order not found', 404);
  }

  if (['completed', 'cancelled'].includes(existingOrder.status)) {
    throw new AppError('Cannot update finalized order', 400);
  }

  const updatedOrder = await OrderRepository.updateOrder(orderId, orderData);

  return updatedOrder;
};

const changeOrderStatusService = async (orderId, status) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid order ID', 400);
  }

  const allowedStatuses = ['pending', 'preparing', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(status)) {
    throw new AppError('Invalid order status', 400);
  }

  const existingOrder = await OrderRepository.findOrderById(orderId);

  if (!existingOrder) throw new AppError('Order not found', 404);

  if (['completed', 'cancelled'].includes(existingOrder.status)) {
    throw new AppError('Cannot update finalized order', 400);
  }

  const updatedOrder = await OrderRepository.updateOrderStatus(orderId, status);

  return updatedOrder;
};

const cancelOrderService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid order ID', 400);
  }

  const existingOrder = await OrderRepository.findOrderById(orderId);

  if (!existingOrder) throw new AppError('Order not found', 404);

  if (['completed', 'cancelled'].includes(existingOrder.status)) {
    throw new AppError('Cannot cancel finalized order', 400);
  }
  const cancelledOrder = await OrderRepository.cancelOrder(orderId);

  return cancelledOrder;
};

const completeOrderService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid order ID', 400);
  }

  const existingOrder = await OrderRepository.findOrderById(orderId);

  if (!existingOrder) throw new AppError('Order not found', 404);

  if (['completed', 'cancelled'].includes(existingOrder.status)) {
    throw new AppError('Cannot complete finalized order', 400);
  }
  const completedOrder = await OrderRepository.completeOrder(orderId);

  return completedOrder;
};

const payOrderCashService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError('Invalid Order Id', 400);
  }

  const order = await OrderRepository.findOrderById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.paymentMethod !== 'cash') {
    throw new AppError('This order is not cash payment', 400);
  }

  if (order.status === 'cancelled') {
    throw new AppError('Cannot pay cancelled order', 400);
  }

  if (order.status === 'completed') {
    throw new AppError('Order already paid', 400);
  }

  const paidOrder = await OrderRepository.updateOrder(orderId, {
    status: 'completed',
    paymentStatus: 'paid',
  });

  return paidOrder;
};

/**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*- */

export {
  cancelOrderService,
  changeOrderStatusService,
  completeOrderService,
  createOrderService,
  getOrderByIdService,
  getOrdersService,
  payOrderCashService,
  updateOrderService,
};
