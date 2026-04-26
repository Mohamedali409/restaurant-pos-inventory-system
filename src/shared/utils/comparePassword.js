import bcrypt from "bcryptjs";

export const comparePassword = (hashPassword, password) => {
  return bcrypt.compare(password, hashPassword);
};
