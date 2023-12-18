import { Router } from 'express';
import { getProductController } from '../controllers/product.controller';
const productRouter = Router();

productRouter.get('/', getProductController);

export { productRouter };
