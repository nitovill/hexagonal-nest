import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ITransferRepository } from '../../domain/transfer.repository';
import { ICompanyRepository } from '../../domain/company.repository';
import { Transfer } from '../../domain/transfer.entity';
import { CreateTransferDto } from '../../infrastructure/controllers/dto/create-transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @Inject('ITransferRepository')
    private readonly transferRepository: ITransferRepository,
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(dto: CreateTransferDto): Promise<Transfer> {
    if (dto.amount <= 0) {
      throw new BadRequestException(
        'Transfer amount must be greater than zero',
      );
    }

    const currentDate = new Date();
    const transferDate = dto.transfer_date
      ? new Date(dto.transfer_date)
      : currentDate;

    if (dto.transfer_date && transferDate > currentDate) {
      throw new BadRequestException('Transfer date cannot be in the future');
    }

    const company = await this.companyRepository.findById(dto.company_id);
    if (!company) {
      throw new NotFoundException(
        `Company with ID: '${dto.company_id}' not found`,
      );
    }
    const transfer = new Transfer();
    transfer.company_id = dto.company_id;
    transfer.amount = dto.amount;
    transfer.transfer_date = transferDate;
    return this.transferRepository.create(transfer);
  }
}
