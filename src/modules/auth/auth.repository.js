// findUserByEmail
// createUser
// findUserById

import User from "../user/user.model.js";

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const createUser = (data) => {
  return User.create(data);
};

export const findUserById = (userId) => {
  return User.findById(userId);
};
