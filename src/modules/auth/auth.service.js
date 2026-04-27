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

import AppError from "../../shared/utils/AppError.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import * as userRepository from "../user/user.repository.js";

export const createNewUser = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);
  if (user) {
    throw new AppError("email is already used");
  }
  const newUser = await userRepository.createUser(data);

  const token = generateToken(newUser);

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = generateToken(user);

  return { user, token };
};
