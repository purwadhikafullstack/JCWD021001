import { Router } from 'express'
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from '../controllers/product.controller'
import {
  checkRoleSuperAdminAdmin,
  checkRoleSuperadmin,
  verifyToken,
} from '../middleware/auth.middleware'
const productRouter = Router()

productRouter.get('/', verifyToken, getProductController)
productRouter.get('/details/:id', verifyToken, getProductController)
productRouter.post('/create', verifyToken, checkRoleSuperadmin, createProductController)
productRouter.patch('/:id', verifyToken, checkRoleSuperadmin, updateProductController)
productRouter.delete('/:id', verifyToken, checkRoleSuperadmin, deleteProductController)

export { productRouter }
