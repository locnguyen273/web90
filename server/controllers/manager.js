import Account from "../models/account.js";
import bcrypt from "bcrypt";
import Employee from "../models/employee.js";
import Manager from "../models/manager.js";

export const createEmployeeByManager = async (req, res) => {
  try {
    const { name, email, password, phone, department } = req.body;
    const manager = await Manager.findOne({ accountId: req.user.id });
    if (!manager) {
      return res.status(404).json({ message: "Quản lý không tồn tại." });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newAccount = new Account({
        email,
        password: hashedPassword,
        role: "employee",
      });
      await newAccount.save();

      const newEmployee = new Employee({
        name,
        email,
        phone,
        department,
        managerId: manager._id,
        accountId: newAccount._id,
      });
      await newEmployee.save();
      res
        .status(201)
        .json({ message: "Tạo nhân viên thành công", data: newEmployee });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
