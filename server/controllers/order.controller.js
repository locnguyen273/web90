import { OrderService } from "../services/order.service.js";

const createNewOrder = (req, res) => {
  return OrderService.createOrderService(req, res);
};

const getAllOrders = (req, res) => {
  return OrderService.getOrdersService(req, res);
};

// const getCustomerDetail = (req, res) => {
//   return OrderService.getCustomerDetailService(req, res);
// };

// const updateCustomer = (req, res) => {
//   return OrderService.updateOrderService(req, res);
// };

// const deleteCustomer = (req, res) => {
//   return OrderService.deleteOrderService(req, res);
// };

export const OrderController = {
  createNewOrder,
  getAllOrders,
};
