import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Empresa } from './infrastructure/database/entities/empresa.entity';
import { Transferencia } from './infrastructure/database/entities/transferencia.entity';
import { EmpresaController } from './infrastructure/controllers/empresa.controller';
import { EmpresaService } from './application/use-cases/empresa.service';
import { TransferenciaController } from './infrastructure/controllers/transferencia.controller';
import { TransferenciaService } from './application/use-cases/transferencia.service';
import { EmpresaRepository } from './infrastructure/database/repositories/empresa.repository';
import { TransferenciaRepository } from './infrastructure/database/repositories/transferencia.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(config.get('DB_PORT', '5432'), 10),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_DATABASE', 'nest-hexagonal'),
        entities: [Empresa, Transferencia],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Empresa, Transferencia]),
  ],
  controllers: [EmpresaController, TransferenciaController],
  providers: [
    EmpresaService,
    TransferenciaService,
    EmpresaRepository,
    TransferenciaRepository,
    { provide: 'IEmpresaRepository', useClass: EmpresaRepository },
    { provide: 'ITransferenciaRepository', useClass: TransferenciaRepository },
  ],
})
export class AppModule {}
