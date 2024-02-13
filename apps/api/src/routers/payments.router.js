import { Router } from 'express'
import { createPaymentController } from '../controllers/payments.controller'
import { checkRoleUser, verifyToken } from '../middleware/auth.middleware'

const paymentRouter = Router()

paymentRouter.post('/result', verifyToken, checkRoleUser, createPaymentController)

export { paymentRouter }
