// storeName
// address
// phone
// taxRate
// currency
// logo
// receiptFooter

// مفيش relations مباشرة

import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "My Restaurant" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    taxRate: { type: Number, default: 0, min: 0, max: 100 },
    currency: { type: String, default: "EGP" },
    logo: { type: String, default: "" },
    receiptFooter: { type: String, default: "Thank you for your visit!" },
  },
  { timestamps: true },
);

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
