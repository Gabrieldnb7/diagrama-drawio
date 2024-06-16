import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateCookie } from "../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.get("/:id", validateCookie, userController.findOne);