import { Router } from 'express';
import {
  createProductController,
  getProductController,
  updateProductController,
} from '../controllers/product.controller';
const productRouter = Router();

productRouter.get('/', getProductController);
productRouter.post('/', createProductController);
productRouter.patch('/:id', updateProductController);

export { productRouter };
