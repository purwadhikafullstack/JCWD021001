import { Router } from 'express';
import { createPaymentController } from '../controllers/payments.controller';
const paymentRouter = Router();

paymentRouter.post("/", createPaymentController)

export { paymentRouter }