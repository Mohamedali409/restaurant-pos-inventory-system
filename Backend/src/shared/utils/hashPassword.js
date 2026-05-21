import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};
