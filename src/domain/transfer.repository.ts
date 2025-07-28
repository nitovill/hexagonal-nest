import { Transfer } from './transfer.entity';

export interface ITransferRepository {
  create(transfer: Transfer): Promise<Transfer>;
}
