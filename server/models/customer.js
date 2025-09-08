import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

export default model("Customer", customerSchema);
