import express from 'express';
import { router } from '../src/routes/index.js';
import { middlewareDeErros } from '../src/middlewares/erros.middlewares.js';

const app = express();
app.use(express.json());
app.use('/api', router);
app.use(middlewareDeErros);

export default app;