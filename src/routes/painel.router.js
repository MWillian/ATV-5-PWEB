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
painelRouter.get('/entregas/novo', painelEntregasController.exibirFormularioCriacao);
painelRouter.post('/entregas', painelEntregasController.criar);
painelRouter.get('/entregas/:id', painelEntregasController.exibirDetalhe);
painelRouter.patch('/entregas/:id/avancar', painelEntregasController.avancarStatus);
painelRouter.patch('/entregas/:id/cancelar', painelEntregasController.cancelar);

export default painelRouter;
