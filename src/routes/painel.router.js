import { Router } from 'express';
import { painelMotoristasController, painelEntregasController, painelRelatoriosController } from '../container.js';

export const painelRouter = Router();

painelRouter.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Painel Administrativo - Deliver Tracking',
  });
});

painelRouter.get('/motoristas', painelMotoristasController.listarTodos);
painelRouter.get('/motoristas/novo', painelMotoristasController.exibirFormularioCriacao);
painelRouter.post('/motoristas', painelMotoristasController.criar);
painelRouter.get('/motoristas/:id', painelMotoristasController.exibirDetalhe);
painelRouter.get('/motoristas/:id/inativar', painelMotoristasController.inativar);

painelRouter.get('/entregas', painelEntregasController.listarTodos);
painelRouter.get('/entregas/novo', painelEntregasController.exibirFormularioCriacao);
painelRouter.get('/atribuir-motorista', painelEntregasController.exibirAtribuicao);
painelRouter.post('/entregas', painelEntregasController.criar);
painelRouter.post('/atribuir-motorista', painelEntregasController.atribuir);
painelRouter.get('/entregas/:id', painelEntregasController.exibirDetalhe);
painelRouter.patch('/entregas/:id/avancar', painelEntregasController.avancarStatus);
painelRouter.patch('/entregas/:id/cancelar', painelEntregasController.cancelar);

painelRouter.get('/relatorios', painelRelatoriosController.dashboard);
painelRouter.get('/relatorios/entregas-por-status', painelRelatoriosController.exibirEntregasPorStatus);
painelRouter.get('/relatorios/motoristas-ativos', painelRelatoriosController.exibirMotoristasAtivos);

export default painelRouter;
