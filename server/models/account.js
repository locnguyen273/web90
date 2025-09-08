import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accountSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["manager", "customer", "employee"],
    default: "customer",
  },
}, { timestamps: true });

export default model("Account", accountSchema);
