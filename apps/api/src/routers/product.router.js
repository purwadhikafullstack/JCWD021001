import { Router } from 'express';
import {
  createProductController,
  getProductController,
} from '../controllers/product.controller';
const productRouter = Router();

productRouter.get('/', getProductController);
productRouter.post('/', createProductController);

export { productRouter };
