import express from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authenticateApiKey } from "../middlewares/authenticate.middleware.js";

export const router = express.Router();

router.post("/", authenticateApiKey, ProductController.createNewProduct);
router.get("/", authenticateApiKey, ProductController.getAllProducts);
// router.get("/:id", OrderController.getCustomerDetail);
// router.patch("/:id", OrderController.updateCustomer);
// router.delete("/:id", OrderController.deleteCustomer);