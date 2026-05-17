// GET /api/users
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id

// getUsersRoute
// getUserByIdRoute
// createUserRoute
// updateUserRoute
// deleteUserRoute
import express from 'express';
import { protect } from '../../shared/middleware/auth.middleware.js';
import allowTo from '../../shared/middleware/role.middleware.js';
import validation from '../../shared/middleware/validation.middleware.js';
import { createUserValidation } from '../../shared/validators/user.validator.js';
import * as userController from './user.controller.js';

const userRouter = express.Router();

userRouter.use(protect);
userRouter.use(allowTo('admin', 'manager', 'cashier'));
userRouter.get('/order/today', userController.getTodayOrder);
userRouter.get('/order/by-Date', userController.findOrderByDate);

userRouter.post(
  '/add-user',
  allowTo('admin', 'manager'),
  createUserValidation,
  validation,
  userController.createUser,
);
userRouter.patch('/update-user', createUserValidation, validation, userController.updateUserData);

userRouter.use(allowTo('admin', 'manager'));
userRouter.get('/user/all', userController.getAllUser);
userRouter.get('/user/:userId', userController.getUserById);
userRouter.get('/user/email/:email', userController.getUserByEmail);
userRouter.get('/order/all-by-role', userController.getAllUserByRole);
userRouter.delete('/delete-user', userController.deleteUserData);
userRouter.get('/product/top-selling', userController.getTopSellingProduct);
userRouter.get('/orders/cashier/:cashierId', userController.findOrderByCashier);

userRouter.use(allowTo('admin'));
userRouter.get('/order/count', userController.getCounterOrder);
userRouter.get('/order/sum-sales', userController.getSumSales);

export default userRouter;
