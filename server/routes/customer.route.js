import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { myLogger } from "../middlewares/myLogger.js"

export const router = express.Router();

router.post("/", CustomerController.createNewCustomer);
router.get("/", myLogger, CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerDetail);
router.patch("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

// Endpoint: GET /customers/:customerId/orders
router.get("/:customerId/orders", CustomerController.getListOrderByCustomerId)
