import { Router } from 'express';
import { createCartController, deleteCartController, updateCartController } from '../controllers/carts.controller';
const cartRouter = Router();

cartRouter.post("/items", createCartController)
cartRouter.patch("/items/:cartId", updateCartController)
cartRouter.delete("/items/:cartId", deleteCartController)

export {cartRouter}
