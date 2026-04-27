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

router.get("/", categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.post("/createCategory", categoryController.createCategory);
router.put("/updateCategory/:categoryId", categoryController.updateCategory);
router.delete("delete-category/:categoryId", categoryController.deleteCategory);

export default categoryRouter;
