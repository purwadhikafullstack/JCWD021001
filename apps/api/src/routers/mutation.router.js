import { Router } from 'express'
import {
  acceptMutationController,
  createMutationController,
} from '../controllers/mutation.controller'
const mutationRouter = Router()

mutationRouter.post('/', createMutationController)
mutationRouter.patch('/:id', acceptMutationController)

export { mutationRouter }
