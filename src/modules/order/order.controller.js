// createOrder -- Done
// getOrders -- Done
// getOrderById -- Done
// updateOrder -- Done
// changeOrderStatus -- Done
// cancelOrder -- Done
// completeOrder -- Done
// payOrderCash --Done

// refundOrder --TODO

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as OrderService from "./order.service.js";

const createOrder = asyncHandler(async (req, res) => {
  const orderData = req.body;

  const newOrder = await OrderService.createOrderService(orderData);

  res.status(200).json({
    success: true,
    message: "Order Created success",
    data: newOrder,
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const result = await OrderService.getOrdersService(req.query);

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderService.getOrderByIdService(req.params.orderId);

  res.status(200).json({
    success: true,
    data: order,
  });
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const newOrderStatus = await OrderService.changeOrderStatusService(
    req.params.orderId,
    req.body.status,
  );

  res.status(200).json({
    success: true,
    message: "Order Status changed successfully",
    data: newOrderStatus,
  });
});

const cancelOrder = asyncHandler(async (req, res) => {
  await OrderService.cancelOrderService(req.params.orderId);

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
  });
});

const completeOrder = asyncHandler(async (req, res) => {
  const completeOrder = await OrderService.completeOrderService(
    req.params.orderId,
  );

  res.status(201).json({
    success: true,
    message: "Order Completed successfully",
    data: completeOrder,
  });
});

const payOrderCash = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const paidOrder = await OrderService.payOrderCashService(orderId);

  res.status(200).json({
    success: true,
    message: "Order paid successfully cash",
    data: paidOrder,
  });
});

export {
  createOrder,
  getOrders,
  getOrderById,
  changeOrderStatus,
  cancelOrder,
  completeOrder,
  payOrderCash,
};

/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
