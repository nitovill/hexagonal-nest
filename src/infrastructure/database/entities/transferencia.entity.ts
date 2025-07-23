import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity('transferencia')
export class Transferencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number;

  @Column({ type: 'timestamp' })
  fecha_transferencia: Date;
}
