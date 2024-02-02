import { Router } from 'express'
import {
  createOrderController,
  getOrderController,
  getOrderManagementController,
  getWarehouseController,
  updateOrderController,
} from '../controllers/orders.controller'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.patch('/:orderId', updateOrderController)
orderRouter.get('/management', getOrderManagementController)
orderRouter.get('/warehouse', getWarehouseController)
orderRouter.get('/:userId', getOrderController)

export { orderRouter }
