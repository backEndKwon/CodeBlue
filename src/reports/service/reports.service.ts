import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReportsRepository } from '../reports.repository';
import { PatientsRepository } from '../../patients/patients.repository';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import {
  Symptom,
  circulatorySymptoms,
  emergencySymptoms,
  injurySymptoms,
  neurologicalSymptoms,
  otherSymptoms,
  respiratorySymptoms,
} from '../constants/symptoms';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly patientsRepository: PatientsRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager, // 트랜젝션을 위해 DI
  ) {}

  async createReport(createReportDto: CreateReportDto, patient_rrn: string) {
    const createdReport = await this.entityManager.transaction(
      'READ COMMITTED',
      async () => {
        try {
          // 환자 주민등록번호와 증상이 함께 전달된 경우
          if (patient_rrn) {
            const patient = await this.patientsRepository.findByRRN(
              patient_rrn,
            );

            // 환자가 존재하지 않는 경우, 새로운 환자 생성
            let patientId: number;
            if (!patient) {
              const newPatient =
                await this.patientsRepository.createPatientInfo({
                  patient_rrn: patient_rrn,
                });
              patientId = newPatient.patient_id;
            } else {
              patientId = patient.patient_id;
            }
            createReportDto.patient_id = patientId;
          }

          // report 생성
          const { symptoms } = createReportDto;

          const selectedSymptoms = symptoms.split(',');

          const invalidSymptoms = this.getInvalidSymptoms(selectedSymptoms);
          if (invalidSymptoms.length > 0) {
            const error = `유효하지 않은 증상: ${invalidSymptoms.join(', ')}`;
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }

          const emergencyLevel = this.calculateEmergencyLevel(selectedSymptoms);
          createReportDto.symptom_level = emergencyLevel;

          return this.reportsRepository.createReport(
            createReportDto,
            emergencyLevel,
          );
        } catch (error) {
          throw new HttpException(
            error.response || '증상 보고서 생성에 실패하였습니다.',
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      },
    );
    return createdReport;
  }

  // 응급도 알고리즘
  private calculateEmergencyLevel(selectedSymptoms): number {
    const symptomCategories = [
      emergencySymptoms,
      neurologicalSymptoms,
      respiratorySymptoms,
      circulatorySymptoms,
      injurySymptoms,
      otherSymptoms,
    ];

    const symptomScores: number[] = [];

    selectedSymptoms.forEach((symptom) => {
      const categoryIndex = this.getSymptomCategoryIndex(
        symptom,
        symptomCategories,
      );
      const score = this.getSymptomScore(
        symptom,
        symptomCategories[categoryIndex],
      );
      symptomScores.push(score);
    });

    const totalScore = symptomScores.reduce((total, score) => total + score, 0);
    const emergencyLevel = this.emergencyLevelByScore(totalScore);

    return emergencyLevel;
  }

  private getSymptomCategoryIndex(
    symptom: string,
    symptomCategories: Symptom[],
  ): number {
    for (let i = 0; i < symptomCategories.length; i++) {
      if (symptomCategories[i].hasOwnProperty(symptom)) {
        return i;
      }
    }
    return -1;
  }

  private getSymptomScore(symptom: string, symptomCategory: Symptom): number {
    return symptomCategory[symptom] || 0;
  }

  private emergencyLevelByScore(score: number): number {
    if (score > 80) {
      return 5;
    } else if (score > 60) {
      return 4;
    } else if (score > 40) {
      return 3;
    } else if (score > 20) {
      return 2;
    } else {
      return 1;
    }
  }

  private getInvalidSymptoms(selectedSymptoms: string[]): string[] {
    const validSymptoms = [
      ...Object.keys(emergencySymptoms),
      ...Object.keys(neurologicalSymptoms),
      ...Object.keys(respiratorySymptoms),
      ...Object.keys(circulatorySymptoms),
      ...Object.keys(injurySymptoms),
      ...Object.keys(otherSymptoms),
    ];

    return selectedSymptoms.filter(
      (symptom) => !validSymptoms.includes(symptom),
    );
  }

  // 증상보고서 상세 조회
  async getReportDetails(report_id: number) {
    const report = await this.reportsRepository.findReport(report_id);
    if (!report) {
      throw new NotFoundException('일치하는 증상 보고서가 없습니다');
    }

    let result;
    // 환자와 병원 정보가 없을 떄
    if (!report.hospital_id && !report.patient_id) {
      result = report;
    }
    // 환자 정보만 있을 때
    else if (!report.hospital_id && report.patient_id) {
      result = await this.reportsRepository.getReportwithPatientInfo(report_id);
    }
    // 병원 정보만 있을 때
    else if (report.hospital_id && !report.patient_id) {
      result = await this.reportsRepository.getReportwithHospitalInfo(
        report_id,
      );
    }
    // 환자와 병원 정보가 모두 있을 때
    else {
      result = await this.reportsRepository.getReportwithPatientAndHospitalInfo(
        report_id,
      );
    }

    return result;
  }

  // 증상 보고서 수정
  async updateReport(report_id: number, updateReportDto: UpdateReportDto) {
    try {
      const report = await this.reportsRepository.findReport(report_id);
      if (!report) {
        throw new NotFoundException('증상 보고서가 존재하지 않습니다.');
      }
      return this.reportsRepository.updateReport(report_id, updateReportDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        '증상 보고서 수정에 실패하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 더미 데이터 생성 API (추후 제거 예정)
  async createDummyReport() {
    const start: any = new Date();
    const symptom_list: string[] = [
      '소실된 의식',
      '심부전',
      '뇌경색 증상',
      '사지 마비',
      '의식 변화',
      '기억 상실',
      '발작',
      '혼란 상태',
      '가슴 통증',
      '청각 손실',
      '시야 손실',
      '감각 소실',
      '경련',
      '저림 혹은 저속한 손발',
      '심한 두통',
      '기운 없음',
      '오심',
      '구토',
      '호흡곤란',
      '호흡음',
      '흉부 압박감',
      '코막힘',
      '기침',
      '저체온증',
      '혈압 저하',
      '사지 부종',
      '혈압 상승',
      '빈혈',
      '황달',
      '목의 부종',
      '혈액 흘림',
      '혈뇨',
      '점막 출혈',
      '근육통',
      '화상',
      '코피',
      '고열',
      '음식 섭취 곤란',
      '알레르기 반응',
      '가려운 발진',
      '체중감소',
    ];
    let latitude = 35;
    let longitude = 127;
    const count = 0;
    for (let i = 40; i <= 79; i++) {
      // 병원
      for (let j = 1; j <= 5; j++) {
        // 환자
        for (let k = 1; k <= 5; k++) {
          // 증상도
          for (let l = 0; l < 100; l++) {
            const hospital_id: number = i;
            const patient_id: number = j;
            const symptom_level: number = k;
            const symptom: string[] = [];
            const symptom_count: number =
              Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            while (symptom.length < symptom_count) {
              const num: number = Math.floor(Math.random() * (40 - 0 + 1)) + 0;
              if (symptom.every((e) => symptom_list[num] !== e)) {
                symptom.push(symptom_list[num]);
              }
            }
            latitude += 0.0001;
            longitude += 0.0001;
            if (latitude > 38) {
              latitude = 35;
            }
            if (longitude > 129) {
              latitude = 127;
            }
            await this.reportsRepository.createDummyReport(
              hospital_id,
              patient_id,
              symptom_level,
              symptom,
              latitude,
              longitude,
            );
          }
        }
      }
    }
    const end: any = new Date();
    const t: number = end - start;
    console.log(`소요시간 : ${t / 1000}초`);
    console.log(`${count}개 생성`);
  }
}
