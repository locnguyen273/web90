import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { permit } from "../middlewares/roles.js";
import { createEmployeeByManager } from "../controllers/manager.js";

export const router = express.Router();

router.post("/create-employee", authMiddleware, permit('manager'), createEmployeeByManager);