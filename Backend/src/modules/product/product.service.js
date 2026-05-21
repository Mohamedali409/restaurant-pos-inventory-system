// search
// filter by category
// pagination

// getProductsService
// createProductService
// updateProductService
// deleteProductService
// getProductByIdService

import logger from "../../shared/utils/logger.js";
import { MESSAGES } from "../../shared/constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import * as inventoryRepository from "../inventory/inventory.repository.js";
import * as productRepository from "./product.repository.js";

const getProduct = async () => {
  const product = await productRepository.findProducts();
  if (!product) throw new AppError(MESSAGES.PRODUCT_NOTFOUND, 404);

  return product;
};

const getProductById = async (productId) => {
  const product = await productRepository.findProductById(productId);

  if (!product) throw new AppError(MESSAGES.PRODUCT_NOTFOUND, 404);

  return product;
};

const createProduct = async (data) => {
  const currentStock = parseOptionalNonNegativeNumber(
    data.currentStock,
    0,
    "Current stock",
  );
  const reorderLevel = parseOptionalNonNegativeNumber(
    data.reorderLevel,
    5,
    "Reorder level",
  );

  const newProduct = await productRepository.createProduct(data);

  if (!newProduct) throw new AppError(MESSAGES.PRODUCT_CREATE_NOT_SUCCESS, 404);

  await inventoryRepository.createInventory({
    productId: newProduct._id,
    currentStock,
    reorderLevel,
  });

  logger.info(`${MESSAGES.CREATE_PRODUCT_SUCCESS}: ${newProduct.name}`, {
    module: "product",
  });
  return newProduct;
};

const updateProduct = async (productId, data) => {
  const product = await productRepository.findProductById(productId);

  if (!product) throw new AppError(MESSAGES.PRODUCT_NOTFOUND, 404);

  const productUpdate = await productRepository.updateProduct(productId, data);

  if (!productUpdate)
    throw new AppError(MESSAGES.PRODUCT_UPDATE_NOT_SUCCESS, 404);

  return productUpdate;
};

const deleteProduct = async (productId) => {
  const product = await productRepository.findProductById(productId);

  if (!product) throw new AppError(MESSAGES.PRODUCT_NOTFOUND, 404);

  const deleteProduct = await productRepository.deleteProduct(productId);

  if (!deleteProduct)
    throw new AppError(MESSAGES.PRODUCT_DELETE_NOT_SUCCESS, 404);

  await inventoryRepository.deleteInventoryByProductId(productId);

  return deleteProduct;
};

const parseOptionalNonNegativeNumber = (value, defaultValue, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new AppError(`${fieldName} must be a non-negative number`, 400);
  }

  return numericValue;
};

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
