import { Router } from 'express'
import {
  calculationCheckStockController,
  createOrderController,
  getOrderController,
  getOrderManagementController,
  getWarehouseController,
  productToStockIdController,
  updateOrderController,
  getAllOrderByCategoryController, // by putu
  getAllOrderByProductController, // by putu
  getAllOrderController, // by putu
  
} from '../controllers/orders.controller'
import { checkRoleSuperAdminAdmin, verifyToken } from '../middleware/auth.middleware'
const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.patch('/:orderId', updateOrderController)
orderRouter.get('/management', getOrderManagementController)
orderRouter.get('/warehouse', getWarehouseController)
orderRouter.get('/stock', productToStockIdController)
orderRouter.get('/:userId', getOrderController)
orderRouter.get('/stock/:orderId', calculationCheckStockController)

// by putu
orderRouter.get('/sales/all', verifyToken, checkRoleSuperAdminAdmin, getAllOrderController)
orderRouter.get(
  '/sales/category',
  verifyToken,
  checkRoleSuperAdminAdmin,
  getAllOrderByCategoryController,
)
orderRouter.get(
  '/sales/product',
  verifyToken,
  checkRoleSuperAdminAdmin,
  getAllOrderByProductController,
)

export { orderRouter }
