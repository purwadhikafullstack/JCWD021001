import { Router } from 'express';
import { createCartController, deleteCartController, getCartController, updateCartController } from '../controllers/carts.controller';
const cartRouter = Router();

cartRouter.post("/", createCartController)
cartRouter.get("/:userId", getCartController)
cartRouter.patch("/:cartProductId", updateCartController)
cartRouter.delete("/:cartProductId", deleteCartController)

export {cartRouter}
