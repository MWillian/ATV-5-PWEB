import { Router } from 'express';
import { painelMotoristasController, painelEntregasController } from '../container.js';

export const painelRouter = Router();

painelRouter.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Painel Administrativo - Deliver Tracking',
  });
});

painelRouter.get('/motoristas', painelMotoristasController.listarTodos);
painelRouter.get('/motoristas/novo', painelMotoristasController.exibirFormularioCriacao);
painelRouter.post('/motoristas', painelMotoristasController.criar);

painelRouter.get('/entregas', painelEntregasController.listarTodos);

export default painelRouter;