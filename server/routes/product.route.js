import express from "express";
import { ProductController } from "../controllers/product.controller.js";

export const router = express.Router();

router.post("/", ProductController.createNewProduct);
router.get("/", ProductController.getAllProducts);
// router.get("/:id", OrderController.getCustomerDetail);
// router.patch("/:id", OrderController.updateCustomer);
// router.delete("/:id", OrderController.deleteCustomer);