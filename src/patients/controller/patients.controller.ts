import { Controller, Post, Param, Body, Logger } from '@nestjs/common';
import { PatientsService } from '../service/patients.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { GenderFromRrnPipe } from '../pipe/gender-from-rrn.pipe';
import { Patients } from '../patients.entity';

@Controller('patient')
export class PatientsController {
  private logger = new Logger('PatientsController');
  constructor(private readonly patientsService: PatientsService) {}

  @Post('/:report_id')
  createPatientInfo(
    @Param('report_id') report_id: number,
    @Body(new GenderFromRrnPipe()) createPatientInfo: CreatePatientDto, // 주민등록번호를 받으면 자동으로 gender 판정되어 넘겨짐
  ): Promise<Patients> {
    this.logger.verbose('환자 정보 입력 POST API');
    return this.patientsService.createPatientInfo(report_id, createPatientInfo);
  }
}