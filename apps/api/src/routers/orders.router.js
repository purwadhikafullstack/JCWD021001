import { Router } from 'express'
import {
  calculationCheckStockController,
  createOrderController,
  getOrderController,
  // getOrderController,
  getOrderManagementController,
  getWarehouseController,
  productToStockIdController,
  updateOrderController,
  getAllOrderByCategoryController, // by putu
  getAllOrderByProductController, // by putu
  getAllOrderController, // by putu
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
orderRouter.get('/stock', productToStockIdController)
orderRouter.get('/:userId', getOrderController)
orderRouter.get('/stock/:orderId', calculationCheckStockController)

// by putu
// orderRouter.get('/', getAllOrderController)
orderRouter.get('/sales/category', getAllOrderByCategoryController)
orderRouter.get('/sales/product', getAllOrderByProductController)

export { orderRouter }
