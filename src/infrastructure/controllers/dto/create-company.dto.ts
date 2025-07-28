import {
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDateString()
  adhesion_date?: string;
}
