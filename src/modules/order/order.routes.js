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

import express from "express";
import * as orderController from "./order.controller.js";
import allowTo from "../../shared/middleware/role.middleware.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.get("/search", orderController.searchOrders);

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:orderId", orderController.getOrderById);
orderRouter.patch("/:orderId", orderController.updateOrder);

orderRouter.patch("/:orderId/status", orderController.changeOrderStatus);
orderRouter.patch("/:orderId/complete", orderController.completeOrder);
orderRouter.patch("/:orderId/cancel", orderController.cancelOrder);

orderRouter.patch("/:orderId/pay-cash", orderController.payOrderCash);

orderRouter.delete("/:orderId", allowTo("admin"), orderController.deleteOrder);

export default orderRouter;
