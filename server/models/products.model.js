import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
});

export default mongoose.model("Product", ProductSchema);
