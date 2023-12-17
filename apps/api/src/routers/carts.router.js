import { Router } from 'express';
import { createCartController, deleteCartController, getCartController, updateCartController } from '../controllers/carts.controller';
const cartRouter = Router();

cartRouter.post("/items", createCartController)
cartRouter.get("/items/:userId", getCartController)
cartRouter.patch("/items/:cartId", updateCartController)
cartRouter.delete("/items/:cartId", deleteCartController)

export {cartRouter}
