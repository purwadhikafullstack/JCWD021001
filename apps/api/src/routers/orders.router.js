import { Router } from 'express'
import {
  calculationCheckStockController,
  createOrderController,
  getOrderController,
  getOrderManagementController,
  getWarehouseController,
  productToStockIdController,
  updateOrderController,
} from '../controllers/orders.controller'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.patch('/:orderId', updateOrderController)
orderRouter.get('/management', getOrderManagementController)
orderRouter.get('/warehouse', getWarehouseController)
orderRouter.get('/stock', productToStockIdController)
orderRouter.get('/:userId', getOrderController)
// orderRouter.get('/stock/:orderId', calculationCheckStockController)

export { orderRouter }
