import mongoose from "mongoose";
const { Schema, model } = mongoose;

const propertySchema = new Schema(
  {
    address: { type: String },
    price: { type: Schema.Types.Decimal128 },
    area: { type: Number },
    status: { type: String, default: "Đang bán" },
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true }
);

export default model("Property", propertySchema);