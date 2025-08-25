import { CustomerService } from "../services/customer.service.js";

const createNewCustomer = (req, res) => {
  return CustomerService.createCustomerService(req, res);
}

const getAllCustomers = (req, res) => {
  return CustomerService.getCustomersService(req, res);
}

const getCustomerDetail = (req, res) => {
  return CustomerService.getCustomerDetailService(req, res);
}

const updateCustomer = (req, res) => {
  return CustomerService.updateCustomerService(req, res);
}

const deleteCustomer = (req, res) => {
  return CustomerService.deleteCustomerService(req, res);
}

const getListOrderByCustomerId = (req, res) => {
  return CustomerService.getListOrderByCustomerIdService(req, res);
}

export const CustomerController = {
  createNewCustomer,
  getAllCustomers,
  getCustomerDetail,
  updateCustomer,
  deleteCustomer,
  getListOrderByCustomerId,
}