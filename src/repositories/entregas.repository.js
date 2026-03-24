export class EntregasRepository{
    constructor(database){
        this.database = database;
    }

    async listarTodos(){
        return this.database.getEntregas();        
    }

    async criar(dados){
        const novaEntrega = {
            id: this.database.generateId(),
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

    async atualizarEntrega(id,dadosAtualizados){
        const index = this.database.entregas.findIndex(e => e.id === id);
        if (index === -1) return null;
        this.database.entregas[index] = {
            ...this.database.entregas[index],
            ...dadosAtualizados,
            id
        };
        return this.database.entregas[index];
    }
}