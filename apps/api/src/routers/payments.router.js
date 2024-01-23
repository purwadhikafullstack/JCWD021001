import { Router } from 'express';
import { createPaymentController, paymentGatewayController } from '../controllers/payments.controller';
const paymentRouter = Router();

// paymentRouter.post("/", createPaymentController)
paymentRouter.post("/", paymentGatewayController)

export { paymentRouter }