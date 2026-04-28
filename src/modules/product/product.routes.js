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
const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.get("/:productId", productController.getProductById);
productRouter.post("/", uploadProductImage, productController.createProduct);
productRouter.put(
  "/:productId",
  uploadProductImage,
  productController.updateProduct,
);
productRouter.delete("/:productId", productController.deleteProduct);

export default productRouter;
