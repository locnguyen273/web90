import mongoose, { Schema, Document, Model } from "mongoose";

export const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customer", CustomerSchema);
