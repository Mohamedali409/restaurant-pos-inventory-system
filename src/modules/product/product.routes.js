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

import express from "express";
import * as productController from "./product.controller.js";
import { uploadProductImage } from "../../shared/middleware/multer.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import allowTo from "../../shared/middleware/role.middleware.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.get("/:productId", productController.getProductById);
productRouter.post(
  "/",
  protect,
  allowTo("admin"),
  uploadProductImage,
  productController.createProduct,
);
productRouter.put(
  "/:productId",
  protect,
  allowTo("admin"),
  uploadProductImage,
  productController.updateProduct,
);
productRouter.delete(
  "/:productId",
  protect,
  allowTo("admin"),
  productController.deleteProduct,
);

export default productRouter;
