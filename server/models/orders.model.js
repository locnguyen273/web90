import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", require: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
  quantity: { type: Number, require: true },
  totalPrice: { type: Number, require: true },
});

export default mongoose.model("Order", OrderSchema);
