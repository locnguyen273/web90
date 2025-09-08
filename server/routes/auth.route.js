import express from "express";
import { authController } from "../controllers/auth.js";

export const router = express.Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
