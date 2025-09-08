import jwt from "jsonwebtoken";
import Account from "../models/account.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ message: "No token." });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const account = await Account.findById(payload.id);
    if(!account) return res.status(401).json({ message: "Invalid token." });
    if(!account.isActive) return res.status(401).json({ message: "Account is not active." });
    req.user = { id: account._id, role: account.role, email: account.email };
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
