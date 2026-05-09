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

import express, { Router } from "express";
import * as orderController from "./order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", orderController.createOrder);

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:orderId", orderController.getOrderById);

orderRouter.patch("/:orderId/cancel", orderController.cancelOrder);
orderRouter.patch("/:orderId/status", orderController.changeOrderStatus);
orderRouter.patch("/:orderId/complete", orderController.completeOrder);

orderRouter.patch("/orderId/pay-cash", orderController.payOrderCash);

export default orderRouter;
