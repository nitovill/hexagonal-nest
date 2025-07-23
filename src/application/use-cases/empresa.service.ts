import { Injectable, Inject } from '@nestjs/common';
import { IEmpresaRepository } from '../../domain/empresa.repository';
import { Empresa } from '../../domain/empresa.entity';
import { CreateEmpresaDto } from '../../infrastructure/controllers/dto/create-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @Inject('IEmpresaRepository')
    private readonly empresaRepository: IEmpresaRepository,
  ) {}

  async create(dto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = new Empresa();
    empresa.nombre = dto.nombre;
    empresa.fecha_adhesion = dto.fecha_adhesion
      ? new Date(dto.fecha_adhesion)
      : new Date();
    return this.empresaRepository.create(empresa);
  }

  async findLastMonth(): Promise<Empresa[]> {
    return this.empresaRepository.findLastMonth();
  }

  async findWithTransferenciasLastMonth(): Promise<Empresa[]> {
    return this.empresaRepository.findWithTransferenciasLastMonth();
  }
}
