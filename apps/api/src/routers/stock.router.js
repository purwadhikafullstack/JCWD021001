import { Router } from 'express'
import {
  createStockController,
  deleteStockController,
  getStockByIdController,
  getStockByProductIdController,
  getStockController,
  getStockReportController,
} from '../controllers/stock.controller'
import {
  checkRoleSuperAdminAdmin,
  checkRoleSuperadmin,
  verifyToken,
} from '../middleware/auth.middleware'

const stockRouter = Router()

stockRouter.get('/', verifyToken, getStockController)
stockRouter.post('/', verifyToken, checkRoleSuperAdminAdmin, createStockController)
stockRouter.get('/:id', verifyToken, checkRoleSuperAdminAdmin, getStockByIdController)
stockRouter.get('/stock/qty', verifyToken, getStockByProductIdController)
stockRouter.get(
  '/stock/report/month',
  verifyToken,
  checkRoleSuperAdminAdmin,
  getStockReportController,
)
stockRouter.delete(`/:id`, verifyToken, checkRoleSuperAdminAdmin, deleteStockController)

export { stockRouter }
