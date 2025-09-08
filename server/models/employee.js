import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    managerId: { type: Schema.Types.ObjectId, ref: "Manager" },
    department: { type: String },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

export default model("Employee", employeeSchema);