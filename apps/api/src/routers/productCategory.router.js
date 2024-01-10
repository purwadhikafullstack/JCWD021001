import { getProductCategoryController } from '../controllers/productCategory.controller';
import { Router } from 'express';
const productCategoryRouter = Router();

productCategoryRouter.get('/', getProductCategoryController);

export { productCategoryRouter };
