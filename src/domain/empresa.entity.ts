export class Empresa {
  id: string;
  nombre: string;
  fecha_adhesion: Date;
  isActive: boolean;
  transferencias?: Transferencia[];
}

export class Transferencia {
  id: string;
  empresa_id: string;
  monto: number;
  fecha_transferencia: Date;
}
