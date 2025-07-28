import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transfer } from '../../../transfer/infrastructure/database/transfer.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  adhesion_date: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Transfer, (transfer) => transfer.company)
  transfers: Transfer[];
}
