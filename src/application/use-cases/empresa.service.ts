import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../../infrastructure/database/entities/empresa.entity';
import { CreateEmpresaDto } from '../../infrastructure/controllers/dto/create-empresa.dto';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(dto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresaRepository.create({
      nombre: dto.nombre,
      fecha_adhesion: dto.fecha_adhesion
        ? new Date(dto.fecha_adhesion)
        : new Date(),
    });
    return this.empresaRepository.save(empresa);
  }

  async findLastMonth(): Promise<Empresa[]> {
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    return this.empresaRepository.find({
      where: {
        fecha_adhesion: MoreThanOrEqual(lastMonth),
      },
      order: { fecha_adhesion: 'DESC' },
    });
  }

  async findWithTransferenciasLastMonth(): Promise<Empresa[]> {
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    return this.empresaRepository
      .createQueryBuilder('empresa')
      .innerJoin('empresa.transferencias', 'transferencia')
      .where('transferencia.fecha_transferencia >= :lastMonth', { lastMonth })
      .getMany();
  }
}
