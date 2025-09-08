import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const router = express.Router();

router.post("/register", AuthController.registerController);
router.post("/login", AuthController.loginController);
