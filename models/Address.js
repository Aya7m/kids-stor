import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true,ref:'User' },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { minimize: false }
);

export const Addresses =
  mongoose.models.Addresses || mongoose.model("Addresses", addressSchema);
