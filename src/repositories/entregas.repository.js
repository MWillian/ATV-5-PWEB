export class EntregasRepository{
    constructor(database){
        this.database = database;
    }

    async listarTodos(){
        return this.database.getEntregas();        
    }

    async criar(dados){
        const novaEntrega = {
            id: this.nextId++,
            descricao: dados.descricao,
            origem: dados.origem,
            destino: dados.destino,
            status: dados.status,
            historico: dados.historico        
        };
        this.database.setEntregas(novaEntrega);
        return novaEntrega;
    }

    async buscarPorId(id){
        return this.database.getEntregas().find((x)=> x.id === id) ?? null;
    }

    async atualizarEntrega(id,dados){
        const entragaAntiga = this.buscarPorId(id);
        //implementar depois
    }
}