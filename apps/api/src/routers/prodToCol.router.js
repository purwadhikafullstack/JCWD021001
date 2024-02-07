import { Router } from 'express'
import { createProdToColController } from '../controllers/prodToCol.controller'

const prodToColRouter = Router()

prodToColRouter.post('/', createProdToColController)

export { prodToColRouter }
