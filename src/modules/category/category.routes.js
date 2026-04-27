// GET /api/categories
// POST /api/categories
// PUT /api/categories/:id
// DELETE /api/categories/:id

// getCategoriesRoute
// createCategoryRoute
// updateCategoryRoute
// deleteCategoryRoute

import express from "express";

const categoryRouter = express.Router();

import * as categoryController from "./category.controller.js";

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/createCategory", categoryController.createCategory);
categoryRouter.put(
  "/updateCategory/:categoryId",
  categoryController.updateCategory,
);
categoryRouter.delete(
  "delete-category/:categoryId",
  categoryController.deleteCategory,
);

export default categoryRouter;
