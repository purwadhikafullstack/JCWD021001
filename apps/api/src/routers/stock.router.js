import { Router } from 'express'
import {
  createStockController,
  getStockByIdController,
  getStockController,
} from '../controllers/stock.controller'

const stockRouter = Router()

stockRouter.get('/', getStockController)
stockRouter.post('/', createStockController)
stockRouter.get('/:id', getStockByIdController)

export { stockRouter }
