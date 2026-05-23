// تحليلات
// dashboard

// calculateSummary
// generateSalesChart
// calculateTopProducts
// calculatePaymentReport

import * as reportRepository from "./report.repository.js";

const getSummaryService = async () => {
  return reportRepository.aggregateSummary();
};

const getSalesChartService = async ({ startDate, endDate }) => {
  return reportRepository.aggregateSalesData({ startDate, endDate });
};

const getTopProductsService = async (limit = 10) => {
  return reportRepository.aggregateTopProducts(limit);
};

const getPaymentReportService = async () => {
  return reportRepository.aggregatePaymentData();
};

export {
  getSummaryService,
  getSalesChartService,
  getTopProductsService,
  getPaymentReportService,
};
