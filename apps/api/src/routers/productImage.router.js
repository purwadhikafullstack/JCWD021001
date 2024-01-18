import { Router } from 'express'
import { createProductImageController } from '../controllers/productImage.controller'
const productImageRouter = Router()
import { uploadProductImageFile } from '../middleware/multer.middleware'

productImageRouter.post('/', uploadProductImageFile, createProductImageController)

export { productImageRouter }
