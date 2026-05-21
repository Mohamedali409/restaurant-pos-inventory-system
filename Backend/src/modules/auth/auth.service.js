// verify password
// generate token
// login logic

// createUserService
// validateLoginService
// generateAuthToken

// registerUser
// loginUser
// logoutUser
// getCurrentUser

import { MESSAGES } from "../../shared/constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import * as userRepository from "../user/user.repository.js";

export const createNewUser = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);
  if (user) {
    throw new AppError(MESSAGES.EMAIL_USED, 409);
  }
  const newUser = await userRepository.createUser(data);

  const token = generateToken(newUser);

  return { newUser, token };
};

export const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError(MESSAGES.INVALID_LOGIN, 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw new AppError("Invalid Login");

  const token = generateToken(user);

  return { user, token };
};
