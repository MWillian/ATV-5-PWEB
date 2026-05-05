import { AppError } from '../../utils/AppError.js';

export class PainelRelatoriosController {
    constructor(relatoriosService) {
        this.relatoriosService = relatoriosService;
        this.dashboard = this.dashboard.bind(this);
        this.exibirEntregasPorStatus = this.exibirEntregasPorStatus.bind(this);
        this.exibirMotoristasAtivos = this.exibirMotoristasAtivos.bind(this);
        this.exibirPainelInicial = this.exibirPainelInicial.bind(this);
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

    async exibirPainelInicial(req, res, next) {
        try {
            const entregasPorStatus = await this.relatoriosService.obterEntregasPorStatus();
            const motoristasAtivos = await this.relatoriosService.obterMotoristasAtivos();

            const totalEntregas = Object.values(entregasPorStatus).reduce((a, b) => a + b, 0);
            const entregasEmTransito = entregasPorStatus['EM_TRANSITO'] || 0;
            const entregasConcluidas = entregasPorStatus['ENTREGUE'] || 0;
            const totalMotoristasAtivos = motoristasAtivos.length || 0;

            res.render('index', {
                titulo: 'Painel Administrativo - Deliver Tracking',
                totalEntregas,
                entregasEmTransito,
                entregasConcluidas,
                totalMotoristasAtivos
            });
        } catch (err) {
            next(err);
        }
    }
}
