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
import * as order from "./order.controller.js"
const router = express.Router();
router.post("/",order.createOrder)
router.get("/",order.getOrders)
router.get("/:id",order.getOrderById)
router.post("/:id/refund",order.refundOrder)
router.put("/:id/status",order.updateOrderStatus)
export default router
