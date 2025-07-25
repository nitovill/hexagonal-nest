import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transferencia } from './transferencia.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'timestamp' })
  fecha_adhesion: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Transferencia, (transferencia) => transferencia.empresa)
  transferencias: Transferencia[];
}
