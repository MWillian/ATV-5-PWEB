export class EntregasController{
    constructor(service) {
    this.service = service; 
    this.listarTodos = this.listarTodos.bind(this);
    this.buscarPorId = this.buscarPorId.bind(this);
    this.criar = this.criar.bind(this);
    this.atualizarEntrega = this.atualizarEntrega.bind(this);
  }

  async listarTodos(req, res, next) {
    try {
      const entregas = await this.service.listarTodos();
      res.json(entregas);
    } catch (err) { next(err); }
  }

  async criar(req, res, next) {
    try {
        const novaEntrega = await this.service.criar(req.body);
        res.status(201).json(novaEntrega);
    } catch (err) { next(err); }
  }

  async buscarPorId(req,res,next){
    try{
        const entregaEscolhida = await this.service.buscarPorId(Number(req.params.id));
        res.json(entregaEscolhida); 
    }catch(err){ next(err);}
  }

  async atualizarEntrega(req,res,next){
    try{
        const entregaAtualizada = await this.service.atualizarEntrega(Number(req.params.id),req.body);
        res.json(entregaAtualizada); 
    }catch(err){ next(err);}
  }
}