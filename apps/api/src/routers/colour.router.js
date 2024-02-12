import { Router } from 'express'
import {
  createColourController,
  deleteColourController,
  getColourController,
} from '../controllers/colour.controller'
import {
  checkRoleSuperAdminAdmin,
  checkRoleSuperadmin,
  verifyToken,
} from '../middleware/auth.middleware'
const colourRouter = Router()

colourRouter.get('/', getColourController)
colourRouter.post('/', verifyToken, checkRoleSuperadmin, createColourController)
colourRouter.delete('/:id', verifyToken, checkRoleSuperadmin, deleteColourController)

export { colourRouter }
