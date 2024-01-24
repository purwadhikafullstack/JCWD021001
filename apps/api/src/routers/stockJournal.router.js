import { Router } from 'express'
import { createStockJournalController } from '../controllers/stockJournal.controller'
const stockJournalRouter = Router()

stockJournalRouter.post('/', createStockJournalController)

export { stockJournalRouter }
