import { Router } from 'express';
import { getStockController } from '../controllers/stock.controller';

const stockRouter = Router();

stockRouter.get('/', getStockController);

export { stockRouter };
