import { Router } from 'express'
import {
  createProductImageController,
  deleteProductImageController,
} from '../controllers/productImage.controller'
const productImageRouter = Router()
import { uploadProductImageFile } from '../middleware/multer.middleware'

productImageRouter.post('/', uploadProductImageFile, createProductImageController)
productImageRouter.delete('/:id', deleteProductImageController)

export { productImageRouter }
