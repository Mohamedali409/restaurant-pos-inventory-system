// orderNumber
// items: [
//   {
//     productId,
//     nameSnapshot,
//     priceSnapshot,
//     quantity,
//     subtotal
//   }
// ]
// subtotal
// discount
// tax
// total
// paymentMethod (cash | card | wallet)
// status (pending | completed | cancelled)
// cashierId (ref User)
// createdAt

// order → user (cashier)
// order → products (through items)

import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "order number is required"],
      unique: [true, "order number should be unique"],
    },
    customerName: {
      type: String,
      trim: true,
      default: "Walk-in Customer",
    },
    orderType: {
      type: String,
      enum: ["dine-in", "takeaway", "delivery"],
      default: "dine-in",
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          nameSnapshot: {
            type: String,
            required: [true, "name snapshot is required "],
          },
          priceSnapshot: {
            type: Number,
            required: [true, "price snapshot is required"],
            min: [0, "the price snapshot number should be bigger than 0"],
          },
          quantity: {
            type: Number,
            required: [true, "The quantity is required"],
            min: [1, "The quantity number should be bigger than 1"],
          },
          subtotal: {
            type: Number,
            required: [true, "subtotal is required"],
            min: 0,
          },
        },
      ],
      validate: {
        validator: (v) => v.length > 0,
        message: "Order items required",
      },
      required: [true, "The items is required to complete the order"],
    },
    subtotal: {
      type: Number,
      //   required: [true, "the subtotal is required"],
      min: [0, "the subtotal should be bigger than 0"],
      default: 0,
    },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: {
      type: Number,
      //   required: [true, "The total is required"],
      min: [0, "The total should be bigger than 0"],
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "wallet"],
      required: [true, "the payment is required"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      default: "pending",
    },
    cashierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tableNumber: {
      type: Number,
      min: 1,
      required: function () {
        return this.orderType === "dine-in";
      },
    },
    deliveryAddress: {
      type: String,
      required: function () {
        return this.orderType === "delivery";
      },
      trim: true,
    },
    phone: {
      type: String,
      required: function () {
        return this.orderType === "delivery";
      },
      match: [/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"],
    },
    notes: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ cashierId: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

const counterSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default Order;
