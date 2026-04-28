// findCategories
// createCategory
// updateCategory
// deleteCategory

import Category from "./category.model.js";

export const findCategories = () => {
  return Category.find({});
};

export const findCategoryByName = (categoryName) => {
  return Category.findOne({ name: categoryName });
};

export const findCategoryById = (categoryId) => {
  return Category.findById(categoryId);
};

export const createCategory = (data) => {
  return Category.create(data);
};

export const updateCategory = (categoryId, data) => {
  return Category.findByIdAndUpdate(categoryId, data, { new: true });
};

export const deleteCategory = (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};
