import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import { cartRouter } from './routers/carts.router';
import { orderRouter } from './routers/orders.router';
import { productRouter } from './routers/product.router';
import { stockRouter } from './routers/stock.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);

// add another router here ...
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/stock', stockRouter);
export default router;
