import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import * as cartItemController from "../controllers/cartItemController.js";
import { validateCookie } from "../middleware/authMiddleware.js";

export const cartRouter = Router();

cartRouter.get("/:id", validateCookie, cartController.findOne);
cartRouter.post("/items/", validateCookie, cartItemController.create);
cartRouter.put("/items/:id", validateCookie, cartItemController.update);
cartRouter.delete("/items/:id", validateCookie, cartItemController.remove);