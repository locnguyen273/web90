import express from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticateApiKey } from "../middlewares/authenticate.middleware.js";

export const router = express.Router();

router.post("/", authenticateApiKey, OrderController.createNewOrder);
router.get("/", authenticateApiKey, OrderController.getAllOrders);
// router.get("/:id", OrderController.getCustomerDetail);
// router.patch("/:id", OrderController.updateCustomer);
// router.delete("/:id", OrderController.deleteCustomer);