import { Router } from 'express'
import {
  acceptMutationController,
  createMutationController,
  getMutationController,
} from '../controllers/mutation.controller'
import {
  checkRoleAdmin,
  checkRoleSuperAdminAdmin,
  verifyToken,
} from '../middleware/auth.middleware'
const mutationRouter = Router()

mutationRouter.get('/', verifyToken, checkRoleSuperAdminAdmin, getMutationController)
mutationRouter.post('/', verifyToken, checkRoleSuperAdminAdmin, createMutationController)
mutationRouter.patch('/:id', verifyToken, checkRoleSuperAdminAdmin, acceptMutationController)

export { mutationRouter }
