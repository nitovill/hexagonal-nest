import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transferencia as TransferenciaORM } from '../entities/transferencia.entity';
import { Empresa as EmpresaORM } from '../entities/empresa.entity';
import { ITransferenciaRepository } from '../../../domain/transferencia.repository';
import { Transferencia as TransferenciaDomain } from '../../../domain/transferencia.entity';

@Injectable()
export class TransferenciaRepository implements ITransferenciaRepository {
  constructor(
    @InjectRepository(TransferenciaORM)
    private readonly transferenciaRepo: Repository<TransferenciaORM>,
    @InjectRepository(EmpresaORM)
    private readonly empresaRepo: Repository<EmpresaORM>,
  ) {}

  private toDomain(transferencia: TransferenciaORM): TransferenciaDomain {
    return {
      id: transferencia.id,
      empresa_id: transferencia.empresa?.id ?? '',
      monto: Number(transferencia.monto),
      fecha_transferencia: transferencia.fecha_transferencia,
    };
  }

  private async toOrm(
    transferencia: TransferenciaDomain,
  ): Promise<TransferenciaORM> {
    const orm = new TransferenciaORM();
    orm.id = transferencia.id;
    orm.monto = transferencia.monto;
    orm.fecha_transferencia = transferencia.fecha_transferencia;
    if (transferencia.empresa_id) {
      const empresa = await this.empresaRepo.findOne({
        where: { id: transferencia.empresa_id },
      });
      if (!empresa) throw new Error('Empresa not found');
      orm.empresa = empresa;
    }
    return orm;
  }

  async create(
    transferencia: TransferenciaDomain,
  ): Promise<TransferenciaDomain> {
    const orm = await this.toOrm(transferencia);
    const saved = await this.transferenciaRepo.save(orm);
    return this.toDomain(saved);
  }
}
