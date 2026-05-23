// getSummary;
// getSalesChart;
// getTopProducts;
// getPaymentReport;

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as reportService from "./report.service.js";

const getSummary = asyncHandler(async (req, res) => {
  const summary = await reportService.getSummaryService();

  res.status(200).json({
    success: true,
    message: "Dashboard summary",
    data: summary,
  });
});

const getSalesChart = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const data = await reportService.getSalesChartService({ startDate, endDate });

  res.status(200).json({
    success: true,
    message: "Sales chart data",
    data,
  });
});

const getTopProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await reportService.getTopProductsService(limit);

  res.status(200).json({
    success: true,
    message: "Top selling products",
    data,
  });
});

const getPaymentReport = asyncHandler(async (req, res) => {
  const data = await reportService.getPaymentReportService();

  res.status(200).json({
    success: true,
    message: "Payment methods report",
    data,
  });
});

export { getSummary, getSalesChart, getTopProducts, getPaymentReport };
