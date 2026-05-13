import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as inventoryService from "./inventory.service.js";

const getInventory = asyncHandler(async (req, res, next) => {
  const inventory = await inventoryService.getInventoryService();

  res.status(200).json({
    success: true,
    message: "all inventory",
    data: inventory,
  });
});

const adjustStock = asyncHandler(async (req, res, next) => {
  const { productId, currentStock } = req.body;

  const stock = await inventoryService.adjustStockService(
    productId,
    currentStock,
    req.user?.id,
  );

  res.status(200).json({
    success: true,
    message: "stock updated",
    data: stock,
  });
});

const getLowStock = asyncHandler(async (req, res, next) => {
  const stock = await inventoryService.getLowStockService();

  res.status(200).json({
    success: true,
    message: "products with low stock",
    data: stock,
  });
});

const getOutOfStock = asyncHandler(async (req, res, next) => {
  const outOfStock = await inventoryService.getOutOfStockService();

  res.status(200).json({
    success: true,
    message: "products out of stock",
    data: outOfStock,
  });
});

const getStockHistory = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const history = await inventoryService.getStockHistoryService(productId);

  res.status(200).json({
    success: true,
    message: "stock history",
    data: history,
  });
});

const updateReorderLevel = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { reorderLevel } = req.body;

  const inventory = await inventoryService.updateReorderLevelService(
    productId,
    reorderLevel,
  );

  res.status(200).json({
    success: true,
    message: "reorder level updated",
    data: inventory,
  });
});

export {
  getInventory,
  adjustStock,
  getLowStock,
  getOutOfStock,
  getStockHistory,
  updateReorderLevel,
};
