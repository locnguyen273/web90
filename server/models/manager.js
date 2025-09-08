import mongoose from "mongoose";
const { Schema, model } = mongoose;

const managerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    department: { type: String },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

export default model("Manager", managerSchema);