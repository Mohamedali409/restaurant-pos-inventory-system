//   findInventoryService,
//   updateStockService,
//   findLowStockService,
//   findOutOfStock,
//   getInventoryByProductService,
//   updateReorderLevelService
//   deductStock
//   restoreStock

import Inventory from "./inventory.model.js";

const findInventoryService = async () => {
  return await Inventory.find({});
};

const updateStockService = async (productId, quantity) => {
  return await Inventory.findOneAndUpdate(
    { productId },
    { currentStock: quantity },
    { new: true, runValidators: true },
  );
};

const findLowStockService = async () => {
  return await Inventory.find({
    $expr: {
      $lte: ["$currentStock", "$reorderLevel"],
    },
  }).populate("productId");
};

const findOutOfStock = async () => {
  return await Inventory.find({ currentStock: 0 }).populate("productId");
};

const getInventoryByProductService = async (productId) => {
  return await Inventory.findOne({ productId }).populate("productId");
};

const updateReorderLevelService = async (productId, level) => {
  return await Inventory.findOneAndUpdate(
    { productId },
    { reorderLevel: level },
    { new: true, runValidators: true },
  );
};
const deductStock = async (productId, quantity) => {
  return await Inventory.findOneAndUpdate(
    {
      productId,
      currentStock: { $gte: quantity }, // check availability
    },
    {
      $inc: { currentStock: -quantity }, // decrease stock
    },
    { new: true },
  );
};

const restoreStock = async (productId, quantity) => {
  return await Inventory.findOneAndUpdate(
    { productId },
    {
      $inc: { currentStock: quantity }, // زيادة المخزون
    },
    { new: true },
  );
};

export {
  findInventoryService,
  updateStockService,
  findLowStockService,
  findOutOfStock,
  getInventoryByProductService,
  updateReorderLevelService,
  deductStock,
  restoreStock,
};
