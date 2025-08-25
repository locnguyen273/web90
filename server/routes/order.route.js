import express from "express";
import { OrderController } from "../controllers/order.controller.js";

export const router = express.Router();

router.post("/", OrderController.createNewOrder);
router.get("/", OrderController.getAllOrders);
// router.get("/:id", OrderController.getCustomerDetail);
// router.patch("/:id", OrderController.updateCustomer);
// router.delete("/:id", OrderController.deleteCustomer);