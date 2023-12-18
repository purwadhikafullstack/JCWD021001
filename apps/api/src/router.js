import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import { cartRouter } from './routers/carts.router';
import { orderRouter } from './routers/orders.router';
import { productRouter } from './routers/product.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);

// add another router here ...
router.use('/auth', authRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)
router.use('/auth', authRouter);

router.use('/cart', cartRouter);

router.use('/product', productRouter);
export default router;
