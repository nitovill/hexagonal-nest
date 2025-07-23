import { Empresa } from './empresa.entity';

export interface IEmpresaRepository {
  create(empresa: Empresa): Promise<Empresa>;
  findLastMonth(): Promise<Empresa[]>;
  findWithTransferenciasLastMonth(): Promise<Empresa[]>;
  findById(id: string): Promise<Empresa | null>;
}
