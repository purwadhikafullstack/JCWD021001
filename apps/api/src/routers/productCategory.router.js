import {
  createProductCategoryController,
  deleteProductCategoryController,
  getGenderController,
  getProductCategoryController,
  updateProductCategoryController,
} from '../controllers/productCategory.controller'
import { Router } from 'express'
import {
  checkRoleAdmin,
  checkRoleSuperAdminAdmin,
  checkRoleSuperadmin,
  verifyToken,
} from '../middleware/auth.middleware'
const productCategoryRouter = Router()

productCategoryRouter.get('/', verifyToken, checkRoleSuperAdminAdmin, getProductCategoryController)
productCategoryRouter.get('/gender', verifyToken, checkRoleSuperAdminAdmin, getGenderController)
productCategoryRouter.post('/', verifyToken, checkRoleSuperadmin, createProductCategoryController)
productCategoryRouter.patch(
  '/:id',
  verifyToken,
  checkRoleSuperadmin,
  updateProductCategoryController,
)
productCategoryRouter.delete(
  '/:id',
  verifyToken,
  checkRoleSuperadmin,
  deleteProductCategoryController,
)

export { productCategoryRouter }
