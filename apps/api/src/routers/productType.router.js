import { Router } from 'express'
import { getProductTypeController } from '../controllers/productType.controller'
const productTypeRouter = Router()

productTypeRouter.get('/', getProductTypeController)

export { productTypeRouter }
