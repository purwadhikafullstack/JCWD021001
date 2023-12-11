import express, { json, Express } from 'express';
import { basename as _basename } from 'path';
import cors from 'cors';
import { PORT } from './config';
import router from './router';

let server;

export const initializeApp = () => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use('/api', router);

  // global api error handler
  // not found
  app.use((req, res, next) => {
    if (req.path.includes('/api/')) {
      res.status(404).send('Not found !');
    } else {
      next();
    }
  });

  // error
  app.use((err, req, res, next) => {
    if (req.path.includes('/api/')) {
      console.error('Error : ', err.stack);
      res.status(500).send('Error !');
    } else {
      next();
    }
  });

  server = app.listen(PORT);

  return app;
};

export const teardownApp = () => {
  if (server) {
    server.close();
  }
};
