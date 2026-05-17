// registerUser
// loginUser
// logoutUser
// getCurrentUser
import * as authService from './auth.service.js';

import { MESSAGES } from '../../shared/constants/messages.js';
import asyncHandler from '../../shared/utils/asyncHandler.js';

const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const data = { name, email, password };

  const { newUser, token } = await authService.createNewUser(data);

  const { password: pwd, ...userData } = newUser.toObject();

  res.status(201).json({
    success: true,
    message: MESSAGES.REGISTER_SUCCESS,
    user: userData,
    token,
  });
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser(email, password);

  const { password: pwd, ...userData } = user.toObject();
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: MESSAGES.LOGIN_SUCCESS,
    user: userData,
    token,
  });
});

export { userLogin, userRegister };
