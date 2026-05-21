import mongoose from "mongoose";
import AppError from "../../shared/utils/AppError.js";
import logger from "../../shared/utils/logger.js";
import * as stockLogRepository from "../stockLog/stockLog.repository.js";
import * as inventoryRepository from "./inventory.repository.js";

const getInventoryService = async () => {
  const inventory = await inventoryRepository.findInventory();

  if (!inventory.length) {
    logger.warn(
      "Inventory list requested but no inventory records were found",
      {
        module: "inventory",
      },
    );
    throw new AppError("Inventory not found", 404);
  }

  logger.info(`Inventory list requested: ${inventory.length} records`, {
    module: "inventory",
  });

  return inventory;
};

const getLowStockService = async () => {
  const lowStock = await inventoryRepository.findLowStock();

  logger.info(`Low stock list requested: ${lowStock.length} records`, {
    module: "inventory",
  });

  return lowStock;
};

const getStockHistoryService = async (productId) => {
  validateProductId(productId);

  const history = await inventoryRepository.getStockHistory(productId);

  logger.info(
    `Stock history requested for product ${productId}: ${history.length} records`,
    { module: "inventory" },
  );

  return history;
};

const adjustStockService = async (productId, currentStock, userId) => {
  validateProductId(productId);
  const stockValue = Number(currentStock);

  if (!Number.isFinite(stockValue)) {
    logger.warn(`Invalid stock value received for product ${productId}`, {
      module: "inventory",
    });
    throw new AppError("Stock must be a valid number", 400);
  }

  if (stockValue < 0) {
    logger.warn(`Negative stock adjustment rejected for product ${productId}`, {
      module: "inventory",
    });
    throw new AppError("Stock cannot be negative", 400);
  }

  const currentInventory =
    await inventoryRepository.findInventoryByProductId(productId);

  if (!currentInventory) {
    logger.warn(
      `Stock adjustment rejected: inventory not found for product ${productId}`,
      {
        module: "inventory",
      },
    );
    throw new AppError("Inventory not found", 404);
  }

  const updatedInventory = await inventoryRepository.updateStock(
    productId,
    stockValue,
  );

  await stockLogRepository.createStockLog({
    productId,
    type: "adjustment",
    quantity: stockValue - currentInventory.currentStock,
    previousStock: currentInventory.currentStock,
    newStock: stockValue,
    note: "Manual stock adjustment",
    createdBy: userId,
  });

  logger.info(
    `Stock adjusted for product ${productId}: ${currentInventory.currentStock} -> ${stockValue}`,
    { module: "inventory" },
  );

  return updatedInventory;
};

const getOutOfStockService = async () => {
  const outOfStock = await inventoryRepository.findOutOfStock();

  logger.info(`Out of stock list requested: ${outOfStock.length} records`, {
    module: "inventory",
  });

  return outOfStock;
};

const updateReorderLevelService = async (productId, reorderLevel) => {
  validateProductId(productId);
  const reorderValue = Number(reorderLevel);

  if (!Number.isFinite(reorderValue)) {
    logger.warn(`Invalid reorder level received for product ${productId}`, {
      module: "inventory",
    });
    throw new AppError("Reorder level must be a valid number", 400);
  }

  if (reorderValue < 0) {
    logger.warn(`Negative reorder level rejected for product ${productId}`, {
      module: "inventory",
    });
    throw new AppError("Reorder level cannot be negative", 400);
  }

  const inventory = await inventoryRepository.updateReorderLevel(
    productId,
    reorderValue,
  );

  if (!inventory) {
    logger.warn(
      `Reorder level update rejected: inventory not found for product ${productId}`,
      {
        module: "inventory",
      },
    );
    throw new AppError("Inventory not found", 404);
  }

  logger.info(
    `Reorder level updated for product ${productId}: ${reorderValue}`,
    { module: "inventory" },
  );

  return inventory;
};

const validateProductId = (productId) => {
  if (!productId || !mongoose.isValidObjectId(productId)) {
    logger.warn(`Invalid product id received: ${productId}`, {
      module: "inventory",
    });
    throw new AppError("Valid product id is required", 400);
  }
};

export {
  getInventoryService,
  getLowStockService,
  getStockHistoryService,
  adjustStockService,
  getOutOfStockService,
  updateReorderLevelService,
};
