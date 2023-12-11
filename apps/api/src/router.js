import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);

// add another router here ...

export default router;
