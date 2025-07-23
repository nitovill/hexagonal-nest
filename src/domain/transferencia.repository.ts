import { Transferencia } from './transferencia.entity';

export interface ITransferenciaRepository {
  create(transferencia: Transferencia): Promise<Transferencia>;
}
