import mongoose from "mongoose";
const { Schema, model } = mongoose;

const depositSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    depositAmount: { type: Schema.Types.Decimal128 },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Đang chờ xử lí", "Đã thanh toán", "Đã hủy"],
      default: "Đang chờ xử lí",
    },
  },
  { timestamps: true }
);

export default model("Deposit", depositSchema);
