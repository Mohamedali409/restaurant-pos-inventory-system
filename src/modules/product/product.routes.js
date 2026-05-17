// GET /api/products
// GET /api/products/:id
// POST /api/products
// PUT /api/products/:id
// DELETE /api/products/:id

// getProductsRoute
// createProductRoute
// updateProductRoute
// deleteProductRoute
// getProductByIdRoute

import express from 'express';
import { protect } from '../../shared/middleware/auth.middleware.js';
import { uploadProductImage } from '../../shared/middleware/multer.js';
import allowTo from '../../shared/middleware/role.middleware.js';
import validation from '../../shared/middleware/validation.middleware.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../../shared/validators/product.validator.js';
import * as productController from './product.controller.js';
const productRouter = express.Router();

productRouter.get('/', productController.getProduct);
productRouter.get('/:productId', productController.getProductById);
productRouter.post(
  '/',
  protect,
  allowTo('admin'),
  uploadProductImage,
  createProductValidation,
  validation,
  productController.createProduct,
);
productRouter.put(
  '/:productId',
  protect,
  allowTo('admin'),
  uploadProductImage,
  updateProductValidation,
  validation,
  productController.updateProduct,
);

productRouter.delete('/:productId', protect, allowTo('admin'), productController.deleteProduct);

export default productRouter;
