// name
// email
// password
// role (admin | manager | cashier)
// isActive
// createdAt

// user → orders (cashier اللي عامل الطلب)
// user → stockLogs (مين عدل المخزون)

import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
userSchema.index({ email: 1 });
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
