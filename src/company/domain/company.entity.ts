import { Transfer } from '../../transfer/domain/transfer.entity';

export class Company {
  id: string;
  name: string;
  adhesion_date: Date;
  isActive: boolean;
  transfers?: Transfer[];
}
