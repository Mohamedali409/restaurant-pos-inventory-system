//  وظيفته:
// إدارة المخزون
// يعرفك عندك كام قطعة

// getInventoryService
// getInventoryByProductService
// getLowStockService
// getOutOfStockService

// adjustStockService
// deductStockService
// restoreStockService
// updateReorderLevelService

import AppError from "../../shared/utils/AppError.js";
import * as inventoryRepository from "./inventory.repository.js";

const getInventoryService = async () => {
  const inventory = await inventoryRepository.findInventoryService();

  if (!inventory) throw new AppError("you do not have inventory yet", 404);

  return inventory;
};

const getInventoryByProductService = async (productId) => {
  const inventoryProject =
    await inventoryRepository.getInventoryByProductService(productId);

  if (!inventoryProject)
    throw new AppError("You do not have this product in your inventory");

  return inventoryProject;
};

const getLowStockService = async () => {
  const lowStock = await inventoryRepository.findLowStockService();

  return lowStock;
};

const getOutOfStockService = async () => {
  const outOfStock = await inventoryRepository.findOutOfStock();
  return outOfStock;
};

const adjustStockService = async (productId, quantity) => {
  const updateStock = await inventoryRepository.updateStockService(
    productId,
    quantity,
  );
  if (!updateStock) throw new AppError("Update stock is filed ", 404);

  return updateStock;
};

const deductStockService = async (productId, quantity) => {
  return await inventoryRepository.deductStock(productId, quantity);
};

const restoreStockService = async (productId, quantity) => {
  return await inventoryRepository.restoreStock(productId, quantity);
};

const updateReorderLevelService = async (productId, level) => {
  const updateStock = await inventoryRepository.updateReorderLevelService(
    productId,
    level,
  );

  if (!updateStock) throw new AppError("update is filed ", 404);

  return updateStock;
};

export {
  getInventoryService,
  getInventoryByProductService,
  getLowStockService,
  getOutOfStockService,
  adjustStockService,
  deductStockService,
};
