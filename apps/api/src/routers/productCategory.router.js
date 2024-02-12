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

productCategoryRouter.get('/', getProductCategoryController)
productCategoryRouter.get('/gender', getGenderController)
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
