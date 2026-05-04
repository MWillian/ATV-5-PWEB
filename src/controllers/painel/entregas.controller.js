import { AppError } from '../../utils/AppError.js';

export class PainelEntregasController {
    constructor(service) {
        this.service = service;
        this.listarTodos = this.listarTodos.bind(this);
    }

    async listarTodos(req, res, next) {
        try {
            const { status, sucesso, page } = req.query;
            let entregas;

            if (status) {
                entregas = await this.service.listarPorStatus(status);
            } else {
                entregas = await this.service.listarTodos();
            }

            const pageNumber = page ? Number(page) : 1;
            const limitNumber = 10;

            if (!Number.isInteger(pageNumber) || pageNumber < 1) {
                throw new AppError('page deve ser um inteiro maior ou igual a 1.', 400);
            }

            const total = entregas.length;
            const totalPages = Math.max(1, Math.ceil(total / limitNumber));
            const startIndex = (pageNumber - 1) * limitNumber;
            const data = entregas.slice(startIndex, startIndex + limitNumber);

            res.render('entregas/index', {
                entregas: data,
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages,
                statusSelecionado: status || '',
                sucesso
            });
        } catch (err) {
            next(err);
        }
    }
}