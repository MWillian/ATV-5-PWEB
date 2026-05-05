
import { prisma } from '../config/database.js';

export class RelatoriosRepository {
  async contarEntregasPorStatus() {
    const agrupado = await prisma.entrega.groupBy({
      by: ['status'],
      _count: { _all: true }
    });

    return agrupado.map(item => ({
      status: item.status,
      total: item._count._all
    }));
  }

  async listarMotoristasAtivosComEntregasAbertas() {
    const eventos = await prisma.eventoEntrega.findMany({
      where: {
        motoristaId: { not: null },
        entrega: { status: { notIn: ['ENTREGUE', 'CANCELADA'] } }
      },
      distinct: ['motoristaId', 'entregaId'],
      select: {
        motoristaId: true,
        motorista: { select: { nome: true, cpf: true, placa_veiculo: true, status: true } }
      }
    });

    const agregados = new Map();
    eventos.forEach(evento => {
      const motoristaId = evento.motoristaId;
      if (motoristaId == null) {
        return;
      }
      const existente = agregados.get(motoristaId);
      if (existente) {
        existente.entregasEmAberto += 1;
      } else {
        agregados.set(motoristaId, {
          id: motoristaId,
          nome: evento.motorista?.nome ?? null,
          cpf: evento.motorista?.cpf ?? null,
          placaVeiculo: evento.motorista?.placa_veiculo ?? null,
          status: evento.motorista?.status ?? 'ATIVO',
          entregasEmAberto: 1
        });
      }
    });

    return Array.from(agregados.values()).sort((a, b) => a.id - b.id);
  }
}
