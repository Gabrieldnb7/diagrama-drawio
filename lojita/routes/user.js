import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.get("/:id", checkToken, userController.findOne);