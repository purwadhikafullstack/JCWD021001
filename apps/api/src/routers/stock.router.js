import { Router } from 'express'
import { createStockController, getStockController } from '../controllers/stock.controller'

const stockRouter = Router()

stockRouter.get('/', getStockController)
stockRouter.post('/', createStockController)

export { stockRouter }
