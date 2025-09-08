import { AuthService } from "../services/auth.service.js";

const registerController = (req, res) => {
  return AuthService.registerService(req, res);
}

const loginController = (req, res) => {
  return AuthService.loginService(req, res);
}

export const AuthController = {
  registerController,
  loginController,
}