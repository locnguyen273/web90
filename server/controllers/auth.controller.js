import { AuthService } from "../services/auth.service.js";

const register = (req, res) => {
  return AuthService.registerService(req, res);
};

const login = (req, res) => {
  return AuthService.loginService(req, res);
};

export const AuthController = {
  register,
  login,
};
