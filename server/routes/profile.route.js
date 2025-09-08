import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createProfileController,
  profileController,
} from "../controllers/profile.js";

export const router = express.Router();

router.post("/", authMiddleware, createProfileController);
router.get("/", authMiddleware, profileController);
