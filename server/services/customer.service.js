import * as mongoose from "mongoose";
import Customer from "../models/customers.model.js"
import Order from "../models/orders.model.js";

const createCustomerService = async (req, res) => {
  const { name, email, age } = req.body;
  const foundCustomer = await Customer.findOne({ email });
  try {
    if (!name || !email || !age) {
      return res
        .status(404)
        .send({ data: null, status: false, message: "All field is required." });
    }

    if (foundCustomer) {
      return res
        .status(404)
        .send({ data: null, status: false, message: "Customer is existed." });
    } else {
      const data = await Customer.create(req.body);
      return res
        .status(201)
        .send({ data: data, status: true, message: "Created successful." });
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
};

const getCustomersService = async (req, res) => {
  try {
    const data = await Customer.find();
    if (!data) {
      return res.status(404).send({ data: [], status: false, message: "Users not found." })
    } else {
      return res.status(200).send({ data: data, status: true, message: "Success." })
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const getCustomerDetailService = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ data: null, status: false, message: "Invalid MongoDB Obj Id" })
    } else {
      const data = await Customer.findById(id);
      if (data.email) {
        return res.status(200).send({ data: data, status: true, message: "Success." })
      } else return res.status(404).send({ data: null, status: false, message: "Customer not found." })
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const updateCustomerService = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ data: null, status: false, message: "Invalid MongoDB Obj Id" })
    } else {
      const data = await Customer.findByIdAndUpdate(id, req?.body, { new: true });
      if (data.email) {
        return res.status(200).send({ data: data, status: true, message: "Success." })
      } else return res.status(404).send({ data: null, status: false, message: "Customer not found." })
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const deleteCustomerService = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ data: null, status: false, message: "Invalid MongoDB Obj Id" })
    } else {
      const data = await Customer.findById(id);
      if (!data) {
        return res.status(404).send({ data: null, status: false, message: "Customer not found." })
      } {
        const data = await Customer.findByIdAndDelete(id);
        return res.status(200).send({ data: null, status: true, message: "Deleted Customer Success." })
      }
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const getListOrderByCustomerIdService = async (req, res) => {
  const { customerId } = req.params;
  try {
    if (!mongoose.isValidObjectId(customerId)) {
      return res.status(400).send({ data: null, status: false, message: "Invalid MongoDB Obj Id" })
    } else {
      const orders = await Order.find({ customerId }).populate("productId");
      return res.status(200).send({ data: orders, status: true, message: "Success." })
    }
  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

export const CustomerService = {
  createCustomerService,
  getCustomersService,
  getCustomerDetailService,
  updateCustomerService,
  deleteCustomerService,
  getListOrderByCustomerIdService,
};
