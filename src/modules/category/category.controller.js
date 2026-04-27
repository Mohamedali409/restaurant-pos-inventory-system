// getCategories;
// createCategory;
// updateCategory;
// deleteCategory;

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as categoryService from "./category.service.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const category = await categoryService.getCategoriesService();

  res.status(201).json({
    success: true,
    message: "All Category",
    category,
  });
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, isActive } = req.body;
  const { image } = req.file;
  const data = { name, isActive, image };

  const category = await categoryService.createCategoryService(data);

  res.status(201).json({
    success: true,
    message: "Category success",
    category,
  });
});

// get Category By Id
// TODO

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await categoryService.getCategoryByIdService(
    req.params.categoryId,
  );
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryService.updateCategoryService(
    categoryId,
    res.data,
  );
  res.status(201).json({
    success: true,
    message: "category is created",
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await categoryService.deleteCategoryService(categoryId);

  res.status(201).json({
    success: true,
    message: "category is deleted",
    category,
  });
});
