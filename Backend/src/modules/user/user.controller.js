// getUsers
// getUserById
// createUser
// updateUser
// deleteUser

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as userService from "./user.service.js";
// Admin

const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User create successfully",
    data: newUser,
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await userService.getAllUser();

  res.status(200).json({
    success: true,
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await userService.getUserById(userId);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const getAllUserByRole = asyncHandler(async (req, res) => {
  const users = await userService.getAllUserByRole(req.body);

  res.status(200).json({
    success: true,
    data: users,
  });
});

const updateUserData = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userUpdated = await userService.updateUser(userId, req.body);

  res.status(200).json({
    success: true,
    message: "user updated successfully",
    data: userUpdated,
  });
});

const deleteUserData = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

const getCounterOrder = asyncHandler(async (req, res) => {
  const orderCount = await userService.getCountOrder();

  res.status(200).json({
    success: true,
    message: "counter order",
    data: orderCount,
  });
});

const getSumSales = asyncHandler(async (req, res) => {
  const sumSales = await userService.getSumSales();

  res.status(200).json({
    success: true,
    message: "this is sum sales for all orders",
    data: sumSales,
  });
});

const getTopSellingProduct = asyncHandler(async (req, res) => {
  const product = await userService.getTopSellingProduct();

  res.status(200).json({
    success: true,
    message: "The top product selling ",
    data: product,
  });
});

const findOrderByCashier = asyncHandler(async (req, res) => {
  const { cashierId } = req.params;

  const { orderByCashier, cashier } =
    await userService.findOrderByCashier(cashierId);

  res.status(200).json({
    success: true,
    message: `this all order by cashier : ${cashier.name}`,
    data: orderByCashier,
    cashierData: cashier,
  });
});

const getTodayOrder = asyncHandler(async (req, res) => {
  const orders = await userService.findTodayOrders();

  res.status(200).json({
    success: true,
    message: "this all order for today",
    data: orders,
  });
});

const findOrderByDate = asyncHandler(async (req, res) => {
  const orders = await userService.findOrderByDate(req.body);

  res.status(200).json({
    success: true,
    message: " this all orders by data",
    data: orders,
  });
});

// manager

// cashier

export {
  createUser,
  getAllUser,
  getUserById,
  getUserByEmail,
  getAllUserByRole,
  updateUserData,
  deleteUserData,
  getCounterOrder,
  getSumSales,
  getTopSellingProduct,
  findOrderByCashier,
  getTodayOrder,
  findOrderByDate,
};
