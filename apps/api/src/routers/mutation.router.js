import { Router } from 'express'
import { createMutationController } from '../controllers/mutation.controller'
const mutationRouter = Router()

mutationRouter.post('/', createMutationController)

export { mutationRouter }
