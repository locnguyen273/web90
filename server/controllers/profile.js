import Account from "../models/account.js";
import Customer from "../models/customer.js";
import Manager from "../models/manager.js";
import Employee from "../models/employee.js";

export const profileController = async (req, res) => {
  try {
    const account = await Account.findById(req.user.id);
    if (!account)
      return res.status(404).json({ message: "Account not found." });
    if (account.role === "customer") {
      const customer = await Customer.findOne({ accountId: account._id });
      res.json({
        data: { account, profile: customer },
      });
    }
    if (account.role === "manager") {
      const manager = await Manager.findOne({ accountId: account._id });
      res.json({
        data: { account, profile: manager },
      });
    }
    if (account.role === "employee") {
      const employee = await Employee.findOne({ accountId: account._id });
      res.json({
        data: { account, profile: employee },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfileController = async (req, res) => {
  try {
    const account = await Account.findById(req.user.id);
    console.log(account);
    if (!account)
      return res.status(404).json({ message: "Account not found." });

    if (account.role === "customer") {
      const existed = await Customer.findOne({ accountId: account._id });
      if (existed)
        return res.status(400).json({ message: "Profile customer existed." });
      const { name, phone, address } = req.body;
      const customer = await Customer.create({
        name,
        email: account.email,
        phone,
        address,
        accountId: account._id,
      });
      return res.status(201).json({ data: customer });
    }

    if (account.role === "manager") {
      const existed = await Manager.findOne({ accountId: account._id });
      if (existed)
        return res.status(400).json({ message: "Profile manager existed." });
      const { name, phone, department } = req.body;
      const manager = await Manager.create({
        name,
        email: account.email,
        phone,
        department,
        accountId: account._id,
      });
      return res.status(201).json({ data: manager });
    }

    if (account.role === "employee") {
      const existed = await Employee.findOne({ accountId: account._id });
      if (existed)
        return res.status(400).json({ message: "Profile employee existed." });
      const { name, phone, department, managerId } = req.body;
      const employee = await Employee.create({
        name,
        email: account.email,
        phone,
        department,
        managerId,
        accountId: account._id,
      });
      return res.status(201).json({ data: employee });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
