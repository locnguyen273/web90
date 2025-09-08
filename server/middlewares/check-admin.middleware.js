import Customer from "../models/customers.model.js"

export const checkAdmin = async (req, res, next) => {
  const email = req.headers["user"];
  const foundUser = await Customer.findOne({ email });
  if (foundUser.role !== 'admin') {
    return res.status(403).send({ data: null, status: false, message: "Access denied. Admins only." });
  }
  next();
}