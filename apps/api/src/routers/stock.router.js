import { Router } from 'express'
import {
  createStockController,
  getStockByIdController,
  getStockByProductIdController,
  getStockController,
  getStockReportController,
} from '../controllers/stock.controller'

const stockRouter = Router()

stockRouter.get('/', getStockController)
stockRouter.post('/', createStockController)
stockRouter.get('/:id', getStockByIdController)
stockRouter.get('/stock/qty', getStockByProductIdController)
stockRouter.get('/stock/report/month', getStockReportController)

export { stockRouter }
