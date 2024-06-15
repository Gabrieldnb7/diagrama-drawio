import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import * as cartItemController from "../controllers/cartItemController.js";
import { checkToken } from "../middleware/authMiddleware.js";

export const cartRouter = Router();

cartRouter.get("/:id", checkToken, cartController.findOne);

cartRouter.post("/items/", checkToken, cartItemController.create);
cartRouter.put("/items/:id", checkToken, cartItemController.update);
cartRouter.delete("/items/:id", checkToken, cartItemController.remove);