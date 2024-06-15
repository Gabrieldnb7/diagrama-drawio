import Express from "express";
import * as authController from "../controllers/authController.js";

export const authRouter = Express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);