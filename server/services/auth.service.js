import bcrypt from "bcrypt";
import Customer from "../models/customers.model.js"
import crypto from "crypto";

const registerService = async(req, res) => {
  const { name, email, age, password } = req.body;
  try {
    console.log(req.body);  
    const customerExisted = await Customer.findOne({ email });
    console.log(customerExisted);
    if (!name || !email || !age || !password) {
      return res.status(404).send({ data: null, status: false, message: "All field is required." });
    }
    if (customerExisted) {
      return res.status(404).send({ data: null, status: false, message: "Customer is existed." });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newCustomer = await Customer.create({
        name,
        email,
        age,
        password: hashPassword,
      });
      return res.status(201).send({ data: newCustomer, status: true, message: "Created successful."
      })
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const loginService = async(req, res) => {
  const { email, password } = req.body;
  try {
    const customerExisted = await Customer.findOne({ email });
    if (!email || !password) {
      return res.status(404).send({ data: null, status: false, message: "All field is required." });
    }

    const validPassword = await bcrypt.compare(password, customerExisted.password);
    if (!customerExisted || !validPassword) {
      return res.status(404).send({ data: null, status: false, message: "Email or password is incorrect." });
    }
    const randomSting = crypto.randomBytes(64).toString("hex");
    const apiKey = `web-${customerExisted._id}-${customerExisted.email}-${randomSting}`;
      return res.status(200).send({ data: apiKey, status: true, message: "Login successful." });
    
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

export const AuthService = {
  registerService,
  loginService,
}
