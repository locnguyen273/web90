import Customer from "../models/customers.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const apiKey = req?.query;
    console.log(apiKey);
    if (!apiKey) {
      return res
        .status(401)
        .send({ data: null, status: false, message: "Api Key required" });
    } else {
      const parts = apiKey.apiKey.split("-");
      console.log("parts: ", parts);
      if (parts.length !== 4) {
        return res
          .status(401)
          .send({ data: null, status: false, message: "Invalid Api Key" });
      }
      const userId = parts[1];
      const email = parts[2];
      const user = await Customer.findOne({ _id: userId, email: email });
      if (!user) {
        return res
          .status(401)
          .send({ data: null, status: false, message: "Invalid user" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .send({ data: null, status: false, message: "Server error." });
  }
};
