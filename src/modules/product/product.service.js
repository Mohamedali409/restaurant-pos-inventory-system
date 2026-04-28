// search
// filter by category
// pagination

// getProductsService
// createProductService
// updateProductService
// deleteProductService
// getProductByIdService

import { MESSAGES } from "../../shared/constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
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
  const newProduct = await productRepository.createProduct(data);

  if (!newProduct) throw new AppError(MESSAGES.PRODUCT_CREATE_NOT_SUCCESS, 404);

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

  if (!productId) throw new AppError(MESSAGES.PRODUCT_NOTFOUND, 404);

  const deleteProduct = await productRepository.deleteProduct(productId);

  if (!deleteProduct)
    throw new AppError(MESSAGES.PRODUCT_DELETE_NOT_SUCCESS, 404);

  return deleteProduct;
};

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
