// getUsersService
// getUserByIdService
// createUserService
// updateUserService
// deleteUserService

import user from "./user.model.js";
import * as orderRepository from "../order/order.repository.js";
import * as userRepository from "./user.repository.js";
import mongoose from "mongoose";
import AppError from "../../shared/utils/AppError.js";

/*  *-*-*-*-*-*-*-*-*-*-*-* Admin *-*-*-*-*-*-*-*-*-*-*-* */

//                   ---------> Admin with user (manager and cashier) <---------
const createUser = async (userData) => {
  if (!mongoose.Types.ObjectId.isValid(userData._id)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await userRepository.findUserById(userData._id);

  if (user) {
    throw new AppError("This user used before", 400);
  }

  const newUser = await userRepository.createUser(userData);

  return newUser;
};

const getAllUserByRole = async (userRole) => {
  const user = await userRepository.getUserByRole(userRole);

  if (!user || user.length === 0) {
    throw new AppError("User not found ", 404);
  }

  return user;
};

const getAllUser = async () => {
  const users = await userRepository.findUsers();

  if (!users || users.length === 0) {
    throw new AppError("User not found", 404);
  }

  return users;
};

const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User not found");
  }
  return user;
};

const getUserByEmail = async (userEmail) => {
  const user = await userRepository.findUserByEmail(userEmail);

  if (!user)
    throw new AppError("this email not found please try again later", 404);

  return user;
};

const updateUser = async (userId, userData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const userUpdated = await userRepository.updateUser(userId, userData);

  if (!userUpdated) {
    throw new AppError(
      "The user update filed please try again with valid data",
      401,
    );
  }
  return userUpdated;
};

const deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const userDeleted = await userRepository.deleteUser(userId);

  if (!userDeleted) {
    throw new AppError("The user delete is filed please try again later ", 403);
  }

  return;
};

//                   ---------> Orders <---------

const getCountOrder = async () => {
  const orderCount = await orderRepository.countOrders();

  return orderCount;
};

const getSumSales = async () => {
  const sumSales = await orderRepository.sumSales();

  return sumSales;
};

const getTopSellingProduct = async () => {
  const topProductSelling = await orderRepository.topSellingProducts();

  return topProductSelling;
};

const findOrderByCashier = async (cashierId) => {
  if (!mongoose.Types.ObjectId.isValid(cashierId)) {
    throw new AppError("Invalid casher id", 400);
  }

  const cashier = await userRepository.findUserById(cashierId);

  if (!cashier) {
    throw new AppError("The Cashier not found", 404);
  }

  const orderByCashier = await orderRepository.findOrdersByCashier(cashierId);

  return { orderByCashier, cashier };
};

const findTodayOrders = async () => {
  const orderToday = await orderRepository.findTodayOrders();

  if (!orderToday || orderToday.length === 0) {
    throw new AppError("not found today order", 404);
  }
  return orderToday;
};

const findOrderByDate = async (date) => {
  const orders = await orderRepository.findOrdersByDate(date);

  return orders;
};

export {
  createUser,
  getAllUserByRole,
  getAllUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getCountOrder,
  getSumSales,
  getTopSellingProduct,
  findOrderByCashier,
  findTodayOrders,
  findOrderByDate,
};
