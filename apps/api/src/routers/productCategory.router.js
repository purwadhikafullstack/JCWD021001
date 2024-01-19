import {
  createProductCategoryController,
  getGenderController,
  getProductCategoryController,
  updateProductCategoryController,
} from '../controllers/productCategory.controller'
import { Router } from 'express'
const productCategoryRouter = Router()

productCategoryRouter.get('/', getProductCategoryController)
productCategoryRouter.get('/gender', getGenderController)
productCategoryRouter.post('/', createProductCategoryController)
productCategoryRouter.patch('/:id', updateProductCategoryController)

export { productCategoryRouter }
