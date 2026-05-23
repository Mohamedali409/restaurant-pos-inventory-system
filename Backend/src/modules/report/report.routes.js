// GET /api/reports/summary
// GET /api/reports/sales-chart
// GET /api/reports/top-products
// GET /api/reports/payment-methods

// getSummaryRoute
// getSalesChartRoute
// getTopProductsRoute
// getPaymentReportRoute

import express from "express";
import * as reportController from "./report.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import allowTo from "../../shared/middleware/role.middleware.js";

const reportRouter = express.Router();

reportRouter.use(protect);
reportRouter.use(allowTo("admin", "manager"));

reportRouter.get("/summary", reportController.getSummary);
reportRouter.get("/sales-chart", reportController.getSalesChart);
reportRouter.get("/top-products", reportController.getTopProducts);
reportRouter.get("/payment-methods", reportController.getPaymentReport);

export default reportRouter;
