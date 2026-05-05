import { Router } from 'express';
import { entregasController } from '../container.js';
 
const router = Router();

router.get('/', entregasController.listarTodos);
router.post('/', entregasController.criar);
router.get('/:id', entregasController.buscarPorId);
router.get('/:id/historico', entregasController.obterHistorico);
router.patch('/:id/avancar', entregasController.avancar);
router.patch('/:id/cancelar', entregasController.cancelar);
router.patch('/:id/atribuir', entregasController.atribuirEntrega);

export default router;