import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { checkAdmin } from "../middlewares/check-admin.middleware.js"
import { authenticateApiKey } from "../middlewares/authenticate.middleware.js";

export const router = express.Router();

router.post("/", authenticateApiKey, checkAdmin, CustomerController.createNewCustomer);
router.get("/", authenticateApiKey, CustomerController.getAllCustomers);
router.get("/:id", authenticateApiKey, CustomerController.getCustomerDetail);
router.patch("/:id", authenticateApiKey, checkAdmin, CustomerController.updateCustomer);
router.delete("/:id", authenticateApiKey, checkAdmin, CustomerController.deleteCustomer);

// Endpoint: GET /customers/:customerId/orders
router.get("/:customerId/orders", CustomerController.getListOrderByCustomerId)

router.get("/getApiKey/:id", CustomerController.genApiKeyCustomer)
