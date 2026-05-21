// GET /api/categories
// POST /api/categories
// PUT /api/categories/:id
// DELETE /api/categories/:id

// getCategoriesRoute
// createCategoryRoute
// updateCategoryRoute
// deleteCategoryRoute

import express from "express";

import * as categoryController from "./category.controller.js";
import { uploadCategoryImage } from "../../shared/middleware/multer.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import allowTo from "../../shared/middleware/role.middleware.js";
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post(
  "/",
  protect,
  allowTo("admin"),
  uploadCategoryImage,
  categoryController.createCategory,
);
categoryRouter.put(
  "/:categoryId",
  protect,
  allowTo("admin"),
  uploadCategoryImage,
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/:categoryId",
  protect,
  allowTo("admin"),
  categoryController.deleteCategory,
);

export default categoryRouter;
