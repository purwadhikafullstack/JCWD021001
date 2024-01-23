import { Router } from 'express'
import { createStockJournalController } from '../controllers/stokJournal.controller'
const stockJournalRouter = Router()

stockJournalRouter.post('/', createStockJournalController)

export { stockJournalRouter }
