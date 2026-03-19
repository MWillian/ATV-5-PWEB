import { Router } from 'express';
import EntregasRouter from './entregas.router.js';

export const router = Router();

router.use('/entregas', EntregasRouter);