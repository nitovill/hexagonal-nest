import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  adhesion_date?: string;
}
