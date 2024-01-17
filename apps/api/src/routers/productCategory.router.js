import {
  getGenderController,
  getProductCategoryController,
} from '../controllers/productCategory.controller'
import { Router } from 'express'
const productCategoryRouter = Router()

productCategoryRouter.get('/', getProductCategoryController)
productCategoryRouter.get('/gender', getGenderController)

export { productCategoryRouter }
