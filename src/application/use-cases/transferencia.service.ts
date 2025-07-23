import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transferencia } from '../../infrastructure/database/entities/transferencia.entity';
import { Empresa } from '../../infrastructure/database/entities/empresa.entity';
import { CreateTransferenciaDto } from '../../infrastructure/controllers/dto/create-transferencia.dto';

@Injectable()
export class TransferenciaService {
  constructor(
    @InjectRepository(Transferencia)
    private readonly transferenciaRepository: Repository<Transferencia>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(dto: CreateTransferenciaDto): Promise<Transferencia> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: dto.empresa_id },
    });
    if (!empresa) {
      throw new NotFoundException('Empresa not found');
    }
    const transferencia = this.transferenciaRepository.create({
      empresa,
      monto: dto.monto,
      fecha_transferencia: dto.fecha_transferencia
        ? new Date(dto.fecha_transferencia)
        : new Date(),
    });
    return this.transferenciaRepository.save(transferencia);
  }
}
