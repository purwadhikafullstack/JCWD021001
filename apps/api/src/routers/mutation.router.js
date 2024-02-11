import { Router } from 'express'
import {
  acceptMutationController,
  createMutationController,
  getMutationController,
} from '../controllers/mutation.controller'
import { checkRoleAdmin, verifyToken } from '../middleware/auth.middleware'
const mutationRouter = Router()

mutationRouter.get('/', verifyToken, checkRoleAdmin, getMutationController)
mutationRouter.post('/', verifyToken, checkRoleAdmin, createMutationController)
mutationRouter.patch('/:id', verifyToken, checkRoleAdmin, acceptMutationController)

export { mutationRouter }
