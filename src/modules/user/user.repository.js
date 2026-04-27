// findUsers
// findUserById
// createUser
// updateUser
// deleteUser

import User from "./user.model.js";

export const findUsers = () => {
  return User.find();
};

export const findUserById = (userId) => {
  return User.findById(userId);
};

export const createUser = (data) => {
  return User.create(data);
};

export const updateUser = (userId, data) => {
  return User.findByIdAndUpdate(userId, data);
};

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

export const getUserByEmail = (email) => {
  return User.findOne({ email });
};
export const getUserByEmailAndSelectPassword = (email) => {
  return User.findOne({ email }).select("-password");
};
