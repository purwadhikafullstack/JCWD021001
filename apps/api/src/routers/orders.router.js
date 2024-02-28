import { Router } from 'express'
import {
  calculationCheckStockController,
  createOrderController,
  getOrderController,
  getOrderManagementController,
  getWarehouseController,
  productToStockIdController,
  updateOrderController,
  getOrderDetailController,
  getAllOrderByCategoryController, // by putu
  getAllOrderByProductController, // by putu
  getAllOrderController, // by putu
} from '../controllers/orders.controller'
import { checkRoleSuperAdminAdmin, checkRoleUser, verifyToken } from '../middleware/auth.middleware'

const orderRouter = Router()

orderRouter.post('/', verifyToken, checkRoleUser, createOrderController)
orderRouter.patch('/:orderId', verifyToken, updateOrderController)
orderRouter.get('/management', verifyToken, checkRoleSuperAdminAdmin, getOrderManagementController)
orderRouter.get('/warehouse', verifyToken, checkRoleSuperAdminAdmin, getWarehouseController)
orderRouter.get('/stock', verifyToken, checkRoleUser, productToStockIdController)
orderRouter.get('/:userId', verifyToken, checkRoleUser, getOrderController)
orderRouter.get('/detail/:orderId', verifyToken, getOrderDetailController)
orderRouter.get(
  '/stock/:orderId',
  // verifyToken,
  // checkRoleSuperAdminAdmin,
  calculationCheckStockController,
)

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
