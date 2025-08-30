import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const router = express.Router();

router.post("/", CustomerController.createNewCustomer);
router.get("/", authMiddleware, CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerDetail);
router.patch("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

// Endpoint: GET /customers/:customerId/orders
router.get("/:customerId/orders", CustomerController.getListOrderByCustomerId)
