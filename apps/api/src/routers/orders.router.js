import { Router } from 'express'
import {
  createOrderController,
  getAllOrderByCategoryController,
  getAllOrderByProductController,
  getAllOrderController,
  getOrderController,
} from '../controllers/orders.controller'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.get('/:userId', getOrderController)
orderRouter.get('/', getAllOrderController)
orderRouter.get('/sales/category', getAllOrderByCategoryController)
orderRouter.get('/sales/product', getAllOrderByProductController)

export { orderRouter }
