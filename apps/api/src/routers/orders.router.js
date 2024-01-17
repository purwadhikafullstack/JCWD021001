import { Router } from 'express';
import { createOrderController, getOrderController } from '../controllers/orders.controller';
const orderRouter = Router();

orderRouter.post("/", createOrderController)
orderRouter.get("/:orderId", getOrderController)

export {orderRouter}