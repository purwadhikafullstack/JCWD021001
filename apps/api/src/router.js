import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import { cartRouter } from './routers/carts.router';
import { productRouter } from './routers/product.router';
import { userRouter } from './routers/user.router';


const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);

// add another router here ...
router.use('/auth', authRouter);
router.use('/user', userRouter);

router.use('/cart', cartRouter);

router.use('/product', productRouter);
export default router;
