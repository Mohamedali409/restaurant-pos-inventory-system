// findProducts
// findProductById
// createProduct
// updateProduct
// deleteProduct

import Product from "./product.model.js";

const findProducts = () => {
  return Product.find({});
};

const findProductById = (productId) => {
  return Product.findById(productId);
};

const createProduct = (data) => {
  return Product.create(data);
};

const updateProduct = (productId, data) => {
  return Product.findByIdAndUpdate(productId, data, { new: true });
};

const deleteProduct = (productId) => {
  return Product.findByIdAndDelete(productId);
};

export {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
