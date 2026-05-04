export class PainelMotoristasController {
    constructor(service) {
        this.service = service;
        this.listarTodos = this.listarTodos.bind(this);
        this.exibirFormularioCriacao = this.exibirFormularioCriacao.bind(this);
        this.criar = this.criar.bind(this);
    }

    async listarTodos(req, res, next) {
        try {
                const { status, sucesso } = req.query;
            let motoristas;

            if (status) {
                motoristas = await this.service.listarComFiltros(status);
            } else {
                motoristas = await this.service.listarTodos();
            }

                res.render('motoristas/index', {
                    motoristas,
                    sucesso,
                    statusSelecionado: status || ''
                });
        } catch (err) {
            next(err);
        }
    }

    async exibirFormularioCriacao(req, res, next) {
        try {
            res.render('motoristas/novo', {
                motorista: {},
                erros: {}
            });
        } catch (err) {
            next(err);
        }
    }

    async criar(req, res, next) {
        try {
            const { nome, cpf, placaVeiculo } = req.body;

            const novoMotorista = await this.service.criar({
                nome,
                cpf,
                placaVeiculo
            });

            res.redirect('/painel/motoristas?sucesso=Motorista criado com sucesso');
        } catch (err) {
            return res.render('motoristas/novo', {
                motorista: req.body,
                erros: { mensagem: err.message }
            });
        }
    }
}