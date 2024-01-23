import { Router } from 'express'
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from '../controllers/product.controller'
const productRouter = Router()

productRouter.get('/', getProductController)
productRouter.get('/details/:id', getProductController)
productRouter.post('/create', createProductController)
productRouter.patch('/:id', updateProductController)
productRouter.delete('/:id', deleteProductController)

export { productRouter }
