import { Router } from 'express'
import {
  createCartController,
  deleteCartController,
  getCartController,
  updateCartController,
} from '../controllers/carts.controller'
import { checkRoleUser, verifyToken } from '../middleware/auth.middleware'

const cartRouter = Router()

cartRouter.post('/', verifyToken, checkRoleUser, createCartController)
cartRouter.get('/:userId', verifyToken, checkRoleUser, getCartController)
cartRouter.patch('/:cartProductId', verifyToken, checkRoleUser, updateCartController)
cartRouter.delete('/', verifyToken, checkRoleUser, deleteCartController)

export { cartRouter }
