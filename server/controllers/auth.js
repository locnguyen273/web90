import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../models/account.js";

const registerController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const existedAccount = await Account.findOne({ email });
    if (existedAccount) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await Account.create({
      email,
      password: hashedPassword,
      role: role || "customer",
    });
    res
      .status(201)
      .json({ message: "Account created successfully.", data: newAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    if (!account.isActive) {
      // check if account is active !account.isActive => false
      return res.status(403).json({ message: "Account is inactive." });
    }
    const isPasswordMatched = await bcrypt.compare(password, account.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const payload = { id: account._id, role: account.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "3d",
    });
    res.status(201).json({
        token: token,
        data: { id: account._id, email: account.email, role: account.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authController = {
  registerController,
  loginController,
};
