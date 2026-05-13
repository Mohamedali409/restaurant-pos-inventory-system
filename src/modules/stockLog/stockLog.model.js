import mongoose from "mongoose";

const stockLogSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required"],
    },
    type: {
      type: String,
      enum: ["sale", "restock", "adjustment", "refund"],
      required: [true, "Stock log type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    previousStock: {
      type: Number,
      required: [true, "Previous stock is required"],
      min: 0,
    },
    newStock: {
      type: Number,
      required: [true, "New stock is required"],
      min: 0,
    },
    note: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

stockLogSchema.index({ productId: 1, createdAt: -1 });

const StockLog =
  mongoose.models.StockLog || mongoose.model("StockLog", stockLogSchema);

export default StockLog;
