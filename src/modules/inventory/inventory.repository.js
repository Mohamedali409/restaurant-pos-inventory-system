import StockLog from "../stockLog/stockLog.model.js";
import Inventory from "./inventory.model.js";

const findInventory = () => {
  return Inventory.find({}).populate("productId");
};

const findInventoryByProductId = (productId) => {
  return Inventory.findOne({ productId });
};

const createInventory = (data) => {
  return Inventory.create(data);
};

const updateStock = (productId, currentStock) => {
  return Inventory.findOneAndUpdate(
    { productId },
    { currentStock },
    { new: true, runValidators: true },
  ).populate("productId");
};

const findLowStock = () => {
  return Inventory.find({
    $expr: {
      $lte: ["$currentStock", "$reorderLevel"],
    },
  }).populate("productId");
};

const findOutOfStock = () => {
  return Inventory.find({ currentStock: 0 }).populate("productId");
};

const getStockHistory = (productId) => {
  return StockLog.find({ productId })
    .populate("productId")
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });
};

const updateReorderLevel = (productId, reorderLevel) => {
  return Inventory.findOneAndUpdate(
    { productId },
    { reorderLevel },
    { new: true, runValidators: true },
  ).populate("productId");
};

const deleteInventoryByProductId = (productId) => {
  return Inventory.findOneAndDelete({ productId });
};

export {
  findInventory,
  findInventoryByProductId,
  createInventory,
  updateStock,
  findLowStock,
  getStockHistory,
  findOutOfStock,
  updateReorderLevel,
  deleteInventoryByProductId,
};
