import { Router } from 'express'
import {
  createPaymentController,
  getPaymentController,
  paymentGatewayController,
} from '../controllers/payments.controller'
const paymentRouter = Router()

paymentRouter.post('/result', createPaymentController)
paymentRouter.post('/', paymentGatewayController)
paymentRouter.get('/:userId', getPaymentController)

export { paymentRouter }
