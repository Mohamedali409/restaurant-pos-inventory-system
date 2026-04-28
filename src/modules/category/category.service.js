// getCategoriesService
// createCategoryService
// updateCategoryService
// deleteCategoryService

import AppError from "../../shared/utils/AppError.js";

import * as categoryService from "./category.repository.js";
import { MESSAGES } from "../../shared/constants/messages.js";

export const getCategoriesService = async () => {
  const category = await categoryService.findCategories();

  if (!category) throw new AppError("Don't have Category ");

  return category;
};

export const createCategoryService = async (data) => {
  const category = await categoryService.findCategoryByName(data.name);

  if (category) throw new AppError(MESSAGES.EXISTS_CATEGORY, 400);

  const createCategory = await categoryService.createCategory(data);

  if (!createCategory) throw new AppError(MESSAGES.CANT_CREATE_CATEGORY, 400);

  return category;
};

export const updateCategoryService = async (categoryId, data) => {
  const category = await categoryService.findCategoryById(categoryId);
  if (!category) throw new AppError("Can't find category", 401);

  const categoryUpdated = await categoryService.updateCategory(
    categoryId,
    data,
  );
  if (!categoryUpdated) throw new AppError(MESSAGES.CANT_UPDATE_CATEGORY, 404);

  return categoryUpdated;
};

export const deleteCategoryService = async (categoryId) => {
  const category = await categoryService.findCategoryById(categoryId);
  if (!category) throw new AppError(MESSAGES.CANT_FIND_CATEGORY, 401);

  const categoryDelete = await categoryService.deleteCategory(categoryId);
  if (!categoryDelete) throw new AppError(MESSAGES.CANT_DELETE_CATEGORY);

  return categoryDelete;
};

export const getCategoryByIdService = async (categoryId) => {
  const category = await categoryService.findCategoryById(categoryId);

  if (!category) throw new AppError(MESSAGES.CANT_FIND_CATEGORY, 404);

  return category;
};
