// getProducts
// createProduct
// updateProduct
// deleteProduct
// getProductById

// change product Active

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as productService from "./product.service.js";

const getProduct = asyncHandler(async (req, res, next) => {
  const products = await productService.getProduct();

  res.status(201).json({
    success: true,
    message: "All products",
    products,
  });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await productService.getProductById(productId);

  res.status(201).json({
    success: true,
    product,
  });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, cost, categoryId, barcode } = req.body;

  const image = req.file?.filename;

  const data = { name, description, price, cost, image, categoryId, barcode };

  const product = await productService.createProduct(data);

  res.status(201).json({
    success: true,
    message: "create product success",
    product,
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, cost, categoryId, barcode } = req.body;
  const image = req.file?.filename;
  const data = { name, description, price, cost, categoryId, barcode, image };
  const product = await productService.updateProduct(
    req.params.productId,
    data,
  );

  res.status(201).json({
    success: true,
    message: "Product update success",
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.deleteProduct(req.params.productId);

  res.status(201).json({
    success: true,
    message: "Product delete success",
    product,
  });
});

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
