import { Router } from 'express'
import {
  createOrderController,
  getAllOrderController,
  getOrderController,
} from '../controllers/orders.controller'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.get('/:userId', getOrderController)
orderRouter.get('/', getAllOrderController)

export { orderRouter }
