// search
// filter by category
// pagination

// getProductsService
// createProductService
// updateProductService
// deleteProductService
// getProductByIdService

import AppError from "../../shared/utils/AppError.js";
import * as productRepository from "./product.repository.js";

const getProduct = async () => {
  const product = await productRepository.findProducts();

  if (!product) throw new AppError("Can't found products", 404);

  return product;
};

const getProductById = async (productId) => {
  const product = await productRepository.findProductById(productId);

  if (!product) throw new AppError("con't found this product");

  return product;
};

const createProduct = async (data) => {
  const newProduct = await productRepository.createProduct(data);

  if (!newProduct) throw new AppError("Can't create Product", 404);

  return newProduct;
};

const updateProduct = async (productId, data) => {
  const product = await productRepository.findProductById(productId);

  if (!product) throw new AppError("Can't found this product", 404);

  const productUpdate = await productRepository.updateProduct(productId, data);

  if (!productUpdate) throw new AppError("Can't update product", 404);

  return productUpdate;
};

const deleteProduct = async (productId) => {
  const product = await productRepository.findProductById(productId);

  if (!productId) throw new AppError("con't found this product");

  const deleteProduct = await productRepository.deleteProduct(productId);

  if (!deleteProduct) throw new AppError("Con't deleted this product", 404);

  return deleteProduct;
};

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
