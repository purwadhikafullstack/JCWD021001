import { Router } from 'express'
import {
  createStockJournalController,
  getStockJournalController,
} from '../controllers/stockJournal.controller'
import { checkRoleSuperAdminAdmin, verifyToken } from '../middleware/auth.middleware'
const stockJournalRouter = Router()

stockJournalRouter.post('/', verifyToken, checkRoleSuperAdminAdmin, createStockJournalController)
stockJournalRouter.get(
  '/:warehouseId/:stockId',
  verifyToken,
  checkRoleSuperAdminAdmin,
  getStockJournalController,
)

export { stockJournalRouter }
