// name
// description
// price
// cost
// image
// categoryId (ref Category)
// stock
// barcode
// isActive
// createdAt

// product → category (many-to-one)
// product → orderItems
// product → stockLogs

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
    },
    image: {
      type: String,
      required: [true],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category id is required"],
    },
    barcode: {
      type: String,
      required: [true, "barcode is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
