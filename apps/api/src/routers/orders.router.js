import { Router } from 'express'
import {
  createOrderController,
  getAllOrderByCategoryController,
  getAllOrderByProductController,
  getAllOrderController,
  getOrderController,
  // getOrderController,
  getOrderManagementController,
  getWarehouseController,
  updateOrderController,
} from '../controllers/orders.controller'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.get('/:userId', getOrderController)
orderRouter.get('/', getAllOrderController)
orderRouter.get('/sales/category', getAllOrderByCategoryController)
orderRouter.get('/sales/product', getAllOrderByProductController)
orderRouter.patch('/:orderId', updateOrderController)
orderRouter.get('/management', getOrderManagementController)
orderRouter.get('/warehouse', getWarehouseController)
orderRouter.get('/:userId', getOrderController)

export { orderRouter }
