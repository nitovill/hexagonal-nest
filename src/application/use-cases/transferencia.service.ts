import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITransferenciaRepository } from '../../domain/transferencia.repository';
import { IEmpresaRepository } from '../../domain/empresa.repository';
import { Transferencia } from '../../domain/transferencia.entity';
import { CreateTransferenciaDto } from '../../infrastructure/controllers/dto/create-transferencia.dto';

@Injectable()
export class TransferenciaService {
  constructor(
    @Inject('ITransferenciaRepository')
    private readonly transferenciaRepository: ITransferenciaRepository,
    @Inject('IEmpresaRepository')
    private readonly empresaRepository: IEmpresaRepository,
  ) {}

  async create(dto: CreateTransferenciaDto): Promise<Transferencia> {
    const empresa = await this.empresaRepository.findById(dto.empresa_id);
    if (!empresa) {
      throw new NotFoundException('Empresa not found');
    }
    const transferencia = new Transferencia();
    transferencia.empresa_id = dto.empresa_id;
    transferencia.monto = dto.monto;
    transferencia.fecha_transferencia = dto.fecha_transferencia
      ? new Date(dto.fecha_transferencia)
      : new Date();
    return this.transferenciaRepository.create(transferencia);
  }
}
