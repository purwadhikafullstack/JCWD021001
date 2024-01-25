import { Router } from 'express'
import {
  createStockJournalController,
  getStockJournalController,
} from '../controllers/stockJournal.controller'
const stockJournalRouter = Router()

stockJournalRouter.post('/', createStockJournalController)
stockJournalRouter.get('/:warehouseId/:stockId', getStockJournalController)

export { stockJournalRouter }
