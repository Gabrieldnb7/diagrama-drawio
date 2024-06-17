import Express from "express";
import * as authController from "../controllers/authController.js";
import { validateCookie } from "../middleware/authMiddleware.js";

export const authRouter = Express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", validateCookie, authController.logout)