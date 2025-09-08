import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    age: { type: Number, require: true },
    role: { type: String, default: "user" }, //admin | user
    apiKey: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Customer", CustomerSchema);
