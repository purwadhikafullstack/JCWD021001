import { Router } from 'express'
import {
  acceptMutationController,
  createMutationController,
  getMutationController,
} from '../controllers/mutation.controller'
const mutationRouter = Router()

mutationRouter.get('/', getMutationController)
mutationRouter.post('/', createMutationController)
mutationRouter.patch('/:id', acceptMutationController)

export { mutationRouter }
