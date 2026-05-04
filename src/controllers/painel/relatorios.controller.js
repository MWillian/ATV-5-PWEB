import { AppError } from '../../utils/AppError.js';

export class PainelRelatoriosController {
    constructor(relatoriosService) {
        this.relatoriosService = relatoriosService;
        this.dashboard = this.dashboard.bind(this);
        this.exibirEntregasPorStatus = this.exibirEntregasPorStatus.bind(this);
        this.exibirMotoristasAtivos = this.exibirMotoristasAtivos.bind(this);
    }

    async dashboard(req, res, next) {
        try {
            const entregasPorStatus = await this.relatoriosService.obterEntregasPorStatus();
            const motoristasAtivos = await this.relatoriosService.obterMotoristasAtivos();

            res.render('painel/relatorios/dashboard', {
                entregasPorStatus,
                motoristasAtivos,
                totalEntregas: Object.values(entregasPorStatus).reduce((a, b) => a + b, 0),
                totalMotoristas: motoristasAtivos.length || 0
            });
        } catch (err) {
            next(err);
        }
    }

    async exibirEntregasPorStatus(req, res, next) {
        try {
            const entregasPorStatus = await this.relatoriosService.obterEntregasPorStatus();

            res.render('painel/relatorios/entregas-por-status', {
                entregasPorStatus,
                total: Object.values(entregasPorStatus).reduce((a, b) => a + b, 0)
            });
        } catch (err) {
            next(err);
        }
    }

    async exibirMotoristasAtivos(req, res, next) {
        try {
            const motoristas = await this.relatoriosService.obterMotoristasAtivos();

            res.render('painel/relatorios/motoristas-ativos', {
                motoristas
            });
        } catch (err) {
            next(err);
        }
    }
}
