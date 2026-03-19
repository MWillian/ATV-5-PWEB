import {Router} from 'express';
import { EntregasRepository }  from '../repositories/entregas.repository.js';
import { EntregasService } from '../services/entregas.services.js';
import { EntregasController }  from '../controllers/entregas.controller.js';
import { Database } from '../database/database.js';

const database = new Database();
const repository = new EntregasRepository(database);
const service = new EntregasService(repository);
const controller = new EntregasController(service);

const router = Router();

router.get('/', controller.listarTodos);
router.post('/',controller.criar);
router.get('/:id',controller.buscarPorId);
// router.patch('/:id/avancar',);
// router.patch('/:id/cancelar',);
// router.get('/:id/historico',);
//implementar get com filtros

export default router;