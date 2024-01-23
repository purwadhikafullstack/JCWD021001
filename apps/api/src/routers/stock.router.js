import { Router } from 'express'
import {
  createStockController,
  getStockByIdController,
  getStockByProductIdController,
  getStockController,
} from '../controllers/stock.controller'

const stockRouter = Router()

stockRouter.get('/', getStockController)
stockRouter.post('/', createStockController)
stockRouter.get('/:id', getStockByIdController)
stockRouter.get('/stock/qty', getStockByProductIdController)

export { stockRouter }
