// name
// email
// password
// role (admin | manager | cashier)
// isActive
// createdAt

// user → orders (cashier اللي عامل الطلب)
// user → stockLogs (مين عدل المخزون)

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "user name is required"] },
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    role: {
      type: String,
      enum: ["admin", "manager", "cashier"],
      default: "cashier",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
