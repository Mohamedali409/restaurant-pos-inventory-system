import * as stockLogRepository from "./stockLog.repository.js";

const createStockLogService = async (data) => {
  return stockLogRepository.createStockLog(data);
};

const getStockLogsService = async (filter = {}) => {
  return stockLogRepository.findStockLogs(filter);
};

export { createStockLogService, getStockLogsService };
