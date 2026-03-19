export class Database {
  constructor() {
    this.entregas = [
    {
    id: 1,
    descricao: "Entrega de milho",
    origem: "Maceio",
    destino: "Guarulhos",
    status: "CRIADA",
    historico: [
        {
          data: "19/03/2026",
          descricao: "CRIADA"
        }
      ]
    },
    {
    id: 2,
    descricao: "Entrega de feijão",
    origem: "Arapiraca",
    destino: "Rio de Janeiro",
    status: "EM_TRANSITO",
    historico: [
        {
          data: "19/02/2026",
          descricao: "CRIADA"
        },
        {
          data: "20/02/2026",
          descricao: "EM_TRANSITO"
        },
        {
          data: "22/02/2026",
          descricao: "ENTREGUE"
        }
      ]
    },
    {
    id: 3,
    descricao: "Entrega de macarrão",
    origem: "Pernambuco",
    destino: "São Paulo",
    status: "CRIADA",
    historico: [
        {
          data: "19/01/2026",
          descricao: "CRIADA"
        },
        {
          data: "22/01/2026",
          descricao: "CANCELADA"
        }
      ]
    },
  ]
    this.nextId = 1;
 }

  getEntregas() {
    return this.entregas;
  }

  generateId() {
    return this.nextId++;
  }

  setEntregas(dados){
    this.entregas.push(dados);
  }

  // removeEntrega(id){
  //   const index = this.entregas.findIndex(e => e.id === id);
  //   if (index === -1) return false;

  //   this.entregas.splice(index, 1);
  //   return true;
  // }
    
  atualizarEntrega(id,dadosAtualizados){
    const index = this.entregas.findIndex(e => e.id === id);
    if (index === -1) return null;

    this.entregas[index] = {
      ...this.entregas[index],
      ...dadosAtualizados,
      id
    };
    return this.entregas[index];
  }
  
}
