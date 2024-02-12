import { Router } from 'express'
import { createSizeController, deleteSizeController } from '../controllers/size.controller'
import { checkRoleSuperadmin, verifyToken } from '../middleware/auth.middleware'

const sizeRouter = Router()

sizeRouter.post('/', verifyToken, checkRoleSuperadmin, createSizeController)
sizeRouter.delete('/:id', verifyToken, checkRoleSuperadmin, deleteSizeController)

export { sizeRouter }
