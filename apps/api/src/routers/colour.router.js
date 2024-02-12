import { Router } from 'express'
import {
  createColourController,
  deleteColourController,
  getColourController,
} from '../controllers/colour.controller'
const colourRouter = Router()

colourRouter.get('/', getColourController)
colourRouter.post('/', createColourController)
colourRouter.delete('/:id', deleteColourController)

export { colourRouter }
