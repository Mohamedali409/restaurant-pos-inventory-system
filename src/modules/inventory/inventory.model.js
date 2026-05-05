// productId (ref Product)
// currentStock
// reorderLevel
// updatedAt

// inventory → product (one-to-one)
import mongoose, { mongo } from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product id is required"],
      unique: true,
    },

    currentStock: {
      type: Number,
      required: [true, "Current stock is required"],
      default: 0,
      min: 0,
    },
    reorderLevel: { type: Number, default: 5, min: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

inventorySchema.index({ productId: 1 });
inventorySchema.index({ currentStock: 1 });

inventorySchema.virtual("isLowStock").get(() => {
  return this.currentStock <= this.reorderLevel;
});

const Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default Inventory;
