// GET /api/users
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id

// getUsersRoute
// getUserByIdRoute
// createUserRoute
// updateUserRoute
// deleteUserRoute
import express from "express";
import * as userController from "./user.controller.js";
import allowTo from "../../shared/middleware/role.middleware.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import validate from "../../shared/middleware/validation.middleware.js";
import {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
} from "./user.validation.js";

const userRouter = express.Router();

userRouter.use(protect);
userRouter.use(allowTo("admin", "manager", "cashier"));

userRouter.get("/order/today", userController.getTodayOrder);
userRouter.get("/order/by-Date", userController.findOrderByDate);

userRouter.post(
  "/add-user",
  allowTo("admin", "manager"),
  createUserValidation(),
  validate,
  userController.createUser,
);

userRouter.use(allowTo("admin", "manager"));
userRouter.get("/user/all", userController.getAllUser);
userRouter.get(
  "/user/:userId",
  getUserByIdValidation(),
  validate,
  userController.getUserById,
);
userRouter.get("/user/email/:email", userController.getUserByEmail);
userRouter.get("/order/all-by-role", userController.getAllUserByRole);
userRouter.patch(
  "/update-user/:userId",
  updateUserValidation(),
  validate,
  userController.updateUserData,
);
userRouter.delete(
  "/delete-user/:userId",
  deleteUserValidation(),
  validate,
  userController.deleteUserData,
);
userRouter.get("/product/top-selling", userController.getTopSellingProduct);
userRouter.get("/orders/cashier/:cashierId", userController.findOrderByCashier);

userRouter.use(allowTo("admin"));
userRouter.get("/order/count", userController.getCounterOrder);
userRouter.get("/order/sum-sales", userController.getSumSales);

export default userRouter;
