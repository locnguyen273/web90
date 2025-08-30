import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

export const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);