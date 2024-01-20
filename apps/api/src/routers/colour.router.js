import { Router } from 'express'
import { getColourController } from '../controllers/colour.controller'
const colourRouter = Router()

colourRouter.get('/', getColourController)

export { colourRouter }
