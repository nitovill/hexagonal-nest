import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Company } from './infrastructure/database/entities/company.entity';
import { Transfer } from './infrastructure/database/entities/transfer.entity';
import { CompanyController } from './infrastructure/controllers/company.controller';
import { CompanyService } from './application/use-cases/company.service';
import { TransferController } from './infrastructure/controllers/transfer.controller';
import { TransferService } from './application/use-cases/transfer.service';
import { CompanyRepository } from './infrastructure/database/repositories/company.repository';
import { TransferRepository } from './infrastructure/database/repositories/transfer.repository';

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
        entities: [Company, Transfer],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Company, Transfer]),
  ],
  controllers: [CompanyController, TransferController],
  providers: [
    CompanyService,
    TransferService,
    CompanyRepository,
    TransferRepository,
    { provide: 'ICompanyRepository', useClass: CompanyRepository },
    { provide: 'ITransferRepository', useClass: TransferRepository },
  ],
})
export class AppModule {}
