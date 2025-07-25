import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Empresa as EmpresaORM } from '../entities/empresa.entity';
import { IEmpresaRepository } from '../../../domain/empresa.repository';
import { Empresa as EmpresaDomain } from '../../../domain/empresa.entity';

@Injectable()
export class EmpresaRepository implements IEmpresaRepository {
  constructor(
    @InjectRepository(EmpresaORM)
    private readonly empresaRepo: Repository<EmpresaORM>,
  ) {}

  private toDomain(empresa: EmpresaORM): EmpresaDomain {
    return {
      id: empresa.id,
      nombre: empresa.nombre,
      fecha_adhesion: empresa.fecha_adhesion,
      isActive: empresa.isActive,
      transferencias:
        empresa.transferencias?.map((t) => ({
          id: t.id,
          empresa_id: t.empresa?.id ?? '',
          monto: Number(t.monto),
          fecha_transferencia: t.fecha_transferencia,
        })) ?? [],
    };
  }

  private toOrm(empresa: EmpresaDomain): EmpresaORM {
    const orm = new EmpresaORM();
    orm.id = empresa.id;
    orm.nombre = empresa.nombre;
    orm.fecha_adhesion = empresa.fecha_adhesion;
    orm.isActive = empresa.isActive;
    // transferencias se ignora en create/update
    return orm;
  }

  async create(empresa: EmpresaDomain): Promise<EmpresaDomain> {
    const orm = this.toOrm(empresa);
    const saved = await this.empresaRepo.save(orm);
    return this.toDomain(saved);
  }

  async findLastMonth(): Promise<EmpresaDomain[]> {
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    const empresas = await this.empresaRepo.find({
      where: { fecha_adhesion: MoreThanOrEqual(lastMonth) },
      order: { fecha_adhesion: 'DESC' },
      relations: ['transferencias'],
    });

    return empresas.map((emp) => this.toDomain(emp));
  }

  async findWithTransferenciasLastMonth(): Promise<EmpresaDomain[]> {
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const empresas = await this.empresaRepo
      .createQueryBuilder('empresa')
      .innerJoinAndSelect('empresa.transferencias', 'transferencia')
      .where('transferencia.fecha_transferencia >= :lastMonth', { lastMonth })
      .getMany();
    return empresas.map((emp) => this.toDomain(emp));
  }

  async findById(id: string): Promise<EmpresaDomain | null> {
    const empresa = await this.empresaRepo.findOne({
      where: { id },
      relations: ['transferencias'],
    });
    return empresa ? this.toDomain(empresa) : null;
  }

  async softDelete(id: string): Promise<void> {
    await this.empresaRepo.update({ id }, { isActive: false });
  }
}
