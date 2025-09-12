import mongoose from "mongoose";
const { Schema, model } = mongoose;

const propertySchema = new Schema(
  {
    address: { type: String },
    price: { type: Number },
    area: { type: Number },
    status: { type: String, default: "Đang bán" },
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
    images: [
      { url: String, public_id: String },
    ],
  },
  { timestamps: true }
);

export default model("Property", propertySchema);
