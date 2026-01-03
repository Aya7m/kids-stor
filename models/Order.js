import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    items: [
      {
        product: { type: String, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: "Addresses" },
    pincode: { type: Number, required: true },

    state: { type: String, required: true, default: "Order Placed" },
    data: { type: Number, required: true },
  },
  { minimize: false }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
