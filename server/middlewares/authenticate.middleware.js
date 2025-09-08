import Customer from "../models/customers.model.js";

export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.query.apiKey || null;
  if (!apiKey) {
    return res
      .status(401)
      .send({ data: null, status: false, message: "Unauthorized" });
  }
  const customer = await Customer.findOne({ apiKey });
  if (!customer) {
    return res
      .status(401)
      .send({ data: null, status: false, message: "Invalid API key" });
  }
  req.customer = customer;
  next();
};
