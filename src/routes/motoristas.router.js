import { Router } from 'express';
import { motoristasController } from '../container.js';

const router = Router();

router.get('/', motoristasController.listarTodos);
router.get('/:id', motoristasController.listarPorId);
router.post('/', motoristasController.criar);
router.get('/:id/entregas', motoristasController.listarEntregas);
router.patch('/:id/inativar', motoristasController.inativarMotorista)

export default router;
