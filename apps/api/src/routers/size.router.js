import { Router } from 'express'
import { createSizeController, deleteSizeController } from '../controllers/size.controller'

const sizeRouter = Router()

sizeRouter.post('/', createSizeController)
sizeRouter.delete('/:id', deleteSizeController)

export { sizeRouter }
