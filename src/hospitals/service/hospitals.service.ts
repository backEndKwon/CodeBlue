import { Injectable, NotFoundException } from '@nestjs/common';
import { HospitalsRepository } from '../hospitals.repository';
import { ReportsRepository } from 'src/reports/reports.repository';
import { Crawling } from 'src/commons/middlewares/crawling';
import { KakaoMapService } from 'src/commons/utils/kakao-map.service';
import { MedicalOpenAPI } from 'src/commons/middlewares/medicalOpenAPI';
import { Hospitals } from '../hospitals.entity';
import { number } from 'joi';

@Injectable()
export class HospitalsService {
  constructor(
    private hospitalsRepository: HospitalsRepository,
    private reportRepository: ReportsRepository,
    private crawling: Crawling,
    private kakaoMapService: KakaoMapService,
    private openAPI: MedicalOpenAPI,
  ) {}

  async getHospitals(): Promise<Hospitals[]> {
    return await this.hospitalsRepository.getHospitals();
  }

  // 지역 병상 데이터 조회 (string[], 메디서비스 기반)
  async getLocalHospitals(site: string): Promise<string[]> {
    /*
      지역 옵션 선택
      매개변수 site에 아래 지역 중 하나가 들어옵니다.
      서울특별시 / 경기도 / 강원도 / 광주광역시 / 대구광역시
      대전광역시 / 부산광역시 / 울산광역시 / 인천광역시 / 경상남도
      경상북도 / 세종특별자치시 / 전라남도 / 전라북도 / 제주특별자치도
      충청남도 / 충청북도
    */
    const results = await this.crawling.getLocalHospitaldata(site);
    return results;
  }

  // 전국 병상 데이터 조회 (JSON, 공공데이터 API 기반)
  async getNationHospitals(): Promise<JSON> {
    const results = await this.openAPI.getMedicalData();
    return results;
  }

  // 주변 병상 데이터 조회
  async getNearByHospitals(emogList: string[]): Promise<string[]> {
    const results = await this.crawling.getNearbyHospitals(emogList);
    return results;
  }

  async getReccomendedHospitals(report_id: number) {
    //사용자 위치
    const userLocation = await this.reportRepository.userLocation(report_id);
    // report_id가 없는 경우 예외처리
    if (!userLocation) {
      throw new NotFoundException('해당 아이디의 위치를 찾을 수 없습니다.');
    }
    const startLat = userLocation[0];
    const startLng = userLocation[1];

    // 여기서 바로 예외처리를 해주는게 맞음
    if (!startLat || !startLng) {
      // null은 사용자가 없는 값이라고 명시적으로 표기하는 것이기 때문에 값이 실제로 없는 경우는 undefined 반환
      throw new NotFoundException('현재 위치가 정상적으로 반영되지않았습니다.');
    }

    //데이터 필터링 구간 시작//
    let harversineHospitalsData = [];

    const HospitalsData = await this.hospitalsRepository.AllHospitals();
    for (const hospital of HospitalsData) {
      const endLat = hospital.latitude;
      const endLng = hospital.longitude;
      const distance = this.harversine(startLat, startLng, endLat, endLng);
      harversineHospitalsData.push({
        hospital_id: hospital.hospital_id,
        name: hospital.name,
        phone: hospital.phone,
        distance: distance,
        available_beds: hospital.available_beds,
        latitude: hospital.latitude,
        longitude: hospital.longitude,
      });
    }
    harversineHospitalsData.sort((a, b) => a.distance - b.distance);
    harversineHospitalsData = harversineHospitalsData.slice(0, 20);
    //데이터 필터링 구간 종료//

    //최종 추천 병원 배열 세팅
    const getRecommandHopitals = [];

    // 카카오map API적용 최단시간 거리 계산
    for (const hospital of harversineHospitalsData) {
      const endLat = hospital.latitude;
      const endLng = hospital.longitude;

      const duration = await this.kakaoMapService.getDrivingDuration(
        startLat,
        startLng,
        endLat,
        endLng,
      );
      getRecommandHopitals.push({
        duration: duration,
        distance: hospital.distance,
        hospital_id: hospital.hospital_id,
        name: hospital.name,
        phone: hospital.phone,
        available_beds: hospital.available_beds,
      });
      console.log('duration', duration);
      //추후 결과값 반영시 `${hospital.name}까지 예상소요시간 ${Math.floor(duration/60)}분 ${Math.floor(duration%60)초}
    }

    //최단거리 병원 duration 낮은 순(단위:sec)
    getRecommandHopitals.sort((a, b) => a.duration - b.duration);
    return getRecommandHopitals.slice(0, 10);
  }

  //하버사인(데이터 필터링용)
  async harversine(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ) {
    const R = 6371e3;
    const φ1 = await this.hospitalsRepository.ConvertRadians(startLat);
    const φ2 = await this.hospitalsRepository.ConvertRadians(endLat); //경도만 라디안으로 각각 전환
    const Δφ = await this.hospitalsRepository.ConvertRadians(endLat - startLat); //경도,위도 모두 차이값을 라디안으로 전환
    const Δλ = await this.hospitalsRepository.ConvertRadians(endLng - startLng);
    const arcLenght = await this.hospitalsRepository.arcLength(φ1, φ2, Δφ, Δλ);
    const centralAngle = await this.hospitalsRepository.centralAngle(arcLenght);
    const distance = R * centralAngle;
    return distance;
  }
}
