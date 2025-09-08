// import * as mongoose from "mongoose";
import Customer from "../models/customers.model.js"
import bcrypt from 'bcrypt';

const registerService = async (req, res) => {
  const { email, password, name, age } = req.body;
  const foundCustomer = await Customer.findOne({ email });
  try {
    if (!name || !email || !password || !age) {
      return res
        .status(404)
        .send({ data: null, status: false, message: "All field is required." });
    }
    if(foundCustomer) {
      return res
        .status(400)
        .send({ data: null, status: false, message: "Email already exists." });
    } else {
      const newCustomer = new Customer({ email, password, name, age });
      await newCustomer.save();
      return res.status(201).send({ data: newCustomer, status: true, message: "Register successfully." });
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
};  

const loginService = async (req, res) => {
  const { email, password} = req.body;
  const foundCustomer = await Customer.findOne({ email });
  try {
    if(!foundCustomer) {
      return res.status(404).send({ data: null, status: false, message: "Customer not found." });
    } else {
      const isPasswordValid = await bcrypt.compare(password, foundCustomer.password);
      if (!isPasswordValid) {
        return res.status(401).send({ data: null, status: false, message: "Invalid password." });
      }
      return res.status(201).send({ data: foundCustomer, status: true, message: "Login successfully." });
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
};

export const AuthService = {
  registerService,
  loginService,
}
