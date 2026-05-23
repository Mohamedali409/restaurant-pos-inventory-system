// findUsers
// findUserById
// createUser
// updateUser
// deleteUser

import User from "./user.model.js";

const findUsers = () => {
  return User.find({});
};

const findUserById = (userId) => {
  return User.findById(userId);
};

const findUserByEmail = (email) => {
  return User.findOne({ email: email });
};

const createUser = (data) => {
  return User.create(data);
};

const updateUser = (userId, data) => {
  return User.findByIdAndUpdate(userId, data);
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getUserByEmailAndSelectPassword = (email) => {
  return User.findOne({ email }).select("-password");
};

const getUserByRole = (role) => {
  return User.find({ role });
};

export {
  findUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByEmailAndSelectPassword,
  getUserByRole,
};
