import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { permit } from "../middlewares/roles.js";
import upload from "../middlewares/multer.js";
import { createProperty, updateProperty } from "../controllers/property.js";

export const router = express.Router();

router.post(
  "/",
  authMiddleware,
  permit("manager", "employee"),
  upload.array("images", 5),
  createProperty
);

router.put(
  "/:id",
  authMiddleware,
  permit("manager", "employee"),
  upload.array("images"),
  updateProperty
);
