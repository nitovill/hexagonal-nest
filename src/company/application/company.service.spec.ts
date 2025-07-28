/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ICompanyRepository } from '../domain/company.repository';
import { Company } from '../domain/company.entity';
import { CreateCompanyDto } from '../infrastructure/dto/create-company.dto';

describe('CompanyService', () => {
  let service: CompanyService;
  let mockRepository: jest.Mocked<ICompanyRepository>;

  const mockCompany: Company = {
    id: '1',
    name: 'Test Company',
    adhesion_date: new Date('2024-01-01'),
  };

  beforeEach(async () => {
    const mockRepositoryProvider = {
      provide: 'ICompanyRepository',
      useValue: {
        create: jest.fn(),
        findByName: jest.fn(),
        findLastMonth: jest.fn(),
        findWithTransfersLastMonth: jest.fn(),
        softDelete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, mockRepositoryProvider],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    mockRepository = module.get('ICompanyRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a company successfully with valid data', async () => {
      const dto: CreateCompanyDto = {
        name: 'New Company',
        adhesion_date: '2024-01-01',
      };

      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockCompany);

      const result = await service.create(dto);

      expect(mockRepository.findByName).toHaveBeenCalledWith('New Company');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Company',
          adhesion_date: new Date('2024-01-01'),
        }),
      );
      expect(result).toEqual(mockCompany);
    });

    it('should create a company with current date when adhesion_date is not provided', async () => {
      const dto: CreateCompanyDto = {
        name: 'New Company',
      };

      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockCompany);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Company',
          adhesion_date: expect.any(Date),
        }),
      );
      expect(result).toEqual(mockCompany);
    });

    it('should trim company name', async () => {
      const dto: CreateCompanyDto = {
        name: '  New Company  ',
      };

      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockCompany);

      await service.create(dto);

      expect(mockRepository.findByName).toHaveBeenCalledWith('  New Company  ');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Company',
        }),
      );
    });

    it('should throw BadRequestException when name is empty', async () => {
      const dto: CreateCompanyDto = {
        name: '',
      };

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Company name cannot be empty'),
      );

      expect(mockRepository.findByName).not.toHaveBeenCalled();
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when name is only whitespace', async () => {
      const dto: CreateCompanyDto = {
        name: '   ',
      };

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Company name cannot be empty'),
      );

      expect(mockRepository.findByName).not.toHaveBeenCalled();
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when adhesion_date is in the future', async () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const dto: CreateCompanyDto = {
        name: 'New Company',
        adhesion_date: futureDate.toISOString(),
      };

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Adhesion date cannot be in the future'),
      );

      expect(mockRepository.findByName).not.toHaveBeenCalled();
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when company name already exists', async () => {
      const dto: CreateCompanyDto = {
        name: 'Existing Company',
      };

      mockRepository.findByName.mockResolvedValue(mockCompany);

      await expect(service.create(dto)).rejects.toThrow(
        new ConflictException(
          "There is already a company with the name: 'Existing Company'",
        ),
      );

      expect(mockRepository.findByName).toHaveBeenCalledWith(
        'Existing Company',
      );
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findLastMonth', () => {
    it('should return companies from last month', async () => {
      const companies = [mockCompany];
      mockRepository.findLastMonth.mockResolvedValue(companies);

      const result = await service.findLastMonth();

      expect(mockRepository.findLastMonth).toHaveBeenCalled();
      expect(result).toEqual(companies);
    });

    it('should return empty array when no companies found', async () => {
      mockRepository.findLastMonth.mockResolvedValue([]);

      const result = await service.findLastMonth();

      expect(mockRepository.findLastMonth).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findWithTransfersLastMonth', () => {
    it('should return companies with transfers from last month', async () => {
      const companies = [mockCompany];
      mockRepository.findWithTransfersLastMonth.mockResolvedValue(companies);

      const result = await service.findWithTransfersLastMonth();

      expect(mockRepository.findWithTransfersLastMonth).toHaveBeenCalled();
      expect(result).toEqual(companies);
    });

    it('should return empty array when no companies with transfers found', async () => {
      mockRepository.findWithTransfersLastMonth.mockResolvedValue([]);

      const result = await service.findWithTransfersLastMonth();

      expect(mockRepository.findWithTransfersLastMonth).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('softDeleteCompany', () => {
    it('should soft delete a company successfully', async () => {
      const companyId = '1';
      mockRepository.softDelete.mockResolvedValue(undefined);

      await service.softDeleteCompany(companyId);

      expect(mockRepository.softDelete).toHaveBeenCalledWith(companyId);
    });

    it('should handle repository errors during soft delete', async () => {
      const companyId = '1';
      const error = new Error('Database error');
      mockRepository.softDelete.mockRejectedValue(error);

      await expect(service.softDeleteCompany(companyId)).rejects.toThrow(error);
      expect(mockRepository.softDelete).toHaveBeenCalledWith(companyId);
    });
  });
});
