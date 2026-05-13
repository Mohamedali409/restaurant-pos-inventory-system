import StockLog from "./stockLog.model.js";

const createStockLog = (data) => {
  return StockLog.create(data);
};

const findStockLogs = (filter = {}) => {
  return StockLog.find(filter)
    .populate("productId")
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });
};

export { createStockLog, findStockLogs };
