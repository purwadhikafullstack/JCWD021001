import { Router } from 'express';
import { createOrderController } from '../controllers/orders.controller';
const orderRouter = Router();

orderRouter.post("/", createOrderController)

export {orderRouter}