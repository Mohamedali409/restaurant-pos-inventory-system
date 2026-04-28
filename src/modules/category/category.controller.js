// getCategories;
// createCategory;
// updateCategory;
// deleteCategory;

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as categoryService from "./category.service.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const category = await categoryService.getCategoriesService();

  res.status(200).json({
    success: true,
    message: "All Category",
    category,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;

  const image = req.file?.filename;

  const category = await categoryService.createCategoryService({
    name,
    isActive,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await categoryService.getCategoryByIdService(
    req.params.categoryId,
  );

  res.status(200).json({
    success: true,
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, isActive } = req.body;

  const data = {};

  if (name) data.name = name;

  if (typeof isActive !== "undefined") {
    data.isActive = isActive;
  }

  if (req.file) {
    data.image = req.file.filename;
  }

  const category = await categoryService.updateCategoryService(
    categoryId,
    data,
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  await categoryService.deleteCategoryService(categoryId);

  res.status(201).json({
    success: true,
    message: "category is deleted",
  });
});
