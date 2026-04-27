// getCategoriesService
// createCategoryService
// updateCategoryService
// deleteCategoryService

import AppError from "../../shared/utils/AppError.js";
import * as categoryService from "./category.repository.js";

export const getCategoriesService = async () => {
  const category = await categoryService.findCategories();

  if (!category) throw new AppError("Don't have Category ");

  return category;
};

export const createCategoryService = async (categoryId, data) => {
  const category = await categoryService.findCategoryById(categoryId);

  if (!category) throw new AppError("Cant find category", 401);

  const createCategory = await categoryService.createCategory(data);

  if (!createCategory) throw new AppError("Can't Create Category", 401);

  return createCategory;
};

export const updateCategoryService = async (categoryId, data) => {
  const category = await categoryService.findCategoryById(categoryId);
  if (!category) throw new AppError("Can't find category", 401);

  const categoryUpdated = await categoryService.updateCategory(
    categoryId,
    data,
  );
  if (!categoryUpdated) throw new AppError("Cant update category");

  return categoryUpdated;
};

export const deleteCategoryService = async (categoryId) => {
  const category = await categoryService.findCategoryById(categoryId);
  if (!category) throw new AppError("Can't find category", 401);

  const categoryDelete = await categoryService.deleteCategory(categoryId);
  if (!categoryDelete) throw new AppError("Cant Delete this category");

  return categoryDelete;
};

export const getCategoryByIdService = async (categoryId) => {
  const category = await categoryService.findCategoryById(categoryId);

  if (!category) throw new AppError("Can't found this category", 404);

  return category;
};
