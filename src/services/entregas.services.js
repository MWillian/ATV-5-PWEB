import {AppError} from '../utils/AppError.js'

export class EntregasService{
    constructor(repository){
        this.repository = repository;
    }

    async listarTodos(){
        return this.repository.listarTodos();
    }

    async criar(dados) {
        return this.repository.criar(dados);
    }

    async buscarPorId(id){
        return this.repository.buscarPorId(id);
    }

    async atualizarEntrega(id, dados){
        return this.repository.atualizarEntrega(id,dados);
    }
}