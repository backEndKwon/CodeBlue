import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { AgeRange, BloodType } from '../reports.enum';

export class CreateReportDto {
  @IsOptional()
  @IsNumber()
  symptom_level?: number;

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsOptional()
  @Length(3, 7) // 혈압 3자리 ~ 7자리 e.g. 120/80
  @IsString()
  blood_pressure?: string;

  @IsOptional()
  @IsEnum(AgeRange)
  age_range?: AgeRange;

  @IsOptional()
  @IsEnum(BloodType)
  blood_type?: BloodType;

  @Exclude() // patient_rrn을 createReportDto에서 제외
  patient_rrn?: string;

  @IsOptional()
  @IsNumber()
  patient_id?: number;
}
