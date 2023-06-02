import { Test } from '@nestjs/testing';
import { HospitalsService } from './hospitals.service';
import { HospitalsRepository } from '../hospitals.repository';
import { KakaoMapService } from '../../commons/providers/kakao-map.service';
import { ReportsRepository } from '../..//reports/reports.repository';
import { Crawling } from '../../commons/middlewares/crawling';
import { MedicalOpenAPI } from '../../commons/middlewares/medicalOpenAPI';
import { Hospitals } from '../hospitals.entity';
import { Reports } from '../../reports/reports.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReportsService Unit Testing', () => {
  let hospitalsService: HospitalsService;
  let hospitalsRepository: HospitalsRepository;
  let reportsRepository: ReportsRepository;
  let kakaoMapService: KakaoMapService;
  let crawling: Crawling;
  let openAPI: MedicalOpenAPI;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HospitalsService,
        {
          provide: HospitalsRepository,
          useValue: {
            getHospitals: jest.fn(),
            findHospital: jest.fn(),
            updateAvailableBeds: jest.fn(),
            setDefaultAvailableBeds: jest.fn(),
            getHospitalsWithinRadius: jest.fn(),
            getHospitalsWithoutRadius: jest.fn(),
          },
        },
        {
          provide: ReportsRepository,
          useValue: {
            findReport: jest.fn(),
            updatePatientLocation: jest.fn(),
            updateReportBeingSent: jest.fn(),
            userLocation: jest.fn(),
            createDummyReport: jest.fn(),
          },
        },
        {
          provide: KakaoMapService,
          useValue: {
            convertCoordinatesToRegion: jest.fn(),
            getDrivingResult: jest.fn(),
          },
        },
        {
          provide: Crawling,
          useValue: {
            getLocalHospitaldata: jest.fn(),
            getNearbyHospitals: jest.fn(),
          },
        },
        {
          provide: MedicalOpenAPI,
          useValue: {
            getMedicalData: jest.fn(),
          },
        },
      ],
    }).compile();

    hospitalsService = moduleRef.get(HospitalsService);
    hospitalsRepository = moduleRef.get(HospitalsRepository);
    reportsRepository = moduleRef.get(ReportsRepository);
    kakaoMapService = moduleRef.get(KakaoMapService);
    crawling = moduleRef.get(Crawling);
    openAPI = moduleRef.get(MedicalOpenAPI);
  });

  describe('getHospitals()', () => {
    it('getHospitals request must be performed successfully', async () => {
      const hospitals: Hospitals[] = [];
      jest
        .spyOn(hospitalsRepository, 'getHospitals')
        .mockResolvedValueOnce(hospitals);

      expect(await hospitalsService.getHospitals()).toBe(hospitals);
      expect(hospitalsRepository.getHospitals).toHaveBeenCalledTimes(1);
    });

    it('getLocalHospitals request must be performed successfully', async () => {
      const hospitals: string[] = [];
      const site: string = 'sample';
      jest
        .spyOn(crawling, 'getLocalHospitaldata')
        .mockResolvedValueOnce(hospitals);

      expect(await hospitalsService.getLocalHospitals(site)).toBe(hospitals);
      expect(crawling.getLocalHospitaldata).toHaveBeenCalledTimes(1);
    });

    it('getNationHospitals request must be performed successfully', async () => {
      const hospitals: Hospitals[] = [];
      jest.spyOn(openAPI, 'getMedicalData').mockResolvedValueOnce(hospitals);

      expect(await hospitalsService.getNationHospitals()).toBe(hospitals);
      expect(openAPI.getMedicalData).toHaveBeenCalledTimes(1);
    });

    it('getRecommendedHospitals request must be performed successfully', async () => {
      const report_id: number = 1;
      const queries: object = {};
      const hospitals: string[] | Object = {};
      const recommended = jest.spyOn(hospitalsService, 'getRecommendedHospitals');

      const report: Reports = new Reports;
      const findreport = jest.spyOn(reportsRepository, 'findReport');

      const startLat: number = 37;
      const startLng: number = 126;
      const endLat: number = 38;
      const endLng: number = 127;
      const result: object = {};
      const driving = jest.spyOn(kakaoMapService, 'getDrivingResult');

      const emogList: string[] = [];
      const datas: string[] = [];
      const crawl = jest.spyOn(crawling, 'getNearbyHospitals');

      const dataSource = ['sample'];
      const time: Object = {};
      const duration = {};
      const distance = {};
      
      jest
        .spyOn(reportsRepository, 'findReport')
        .mockResolvedValueOnce(report);
      jest
        .spyOn(hospitalsRepository, 'getHospitalsWithinRadius')
        .mockResolvedValueOnce(dataSource);
      jest
        .spyOn(hospitalsRepository, 'getHospitalsWithoutRadius')
        .mockResolvedValueOnce(dataSource);
      jest
        .spyOn(kakaoMapService, 'getDrivingResult')
        .mockResolvedValueOnce(time);      
      jest
        .spyOn(hospitalsService, 'getRecommendedHospitals')
        .mockResolvedValueOnce(duration);   
      jest
        .spyOn(hospitalsService, 'getRecommendedHospitals')
        .mockResolvedValueOnce(distance);   
      
      // await expect(async () => {
      //   const dataSource = jest.fn();
      //   dataSource.mockReturnValue(['sample']);
      //   await hospitalsService.getRecommendedHospitals(report_id, queries)
      // }).rejects.toThrowError(new NotFoundException('해당 반경 내에 병원이 없습니다.'));
      expect(await hospitalsService.getRecommendedHospitals(report_id, queries)).toStrictEqual(hospitals);
      expect(recommended).toBeCalledTimes(1);
      expect(recommended).toBeCalledWith(report_id, queries);

      expect(await reportsRepository.findReport(report_id)).toStrictEqual(report);
      expect(findreport).toBeCalledTimes(1);
      expect(findreport).toBeCalledWith(report_id);

      expect(await kakaoMapService.getDrivingResult(startLat, startLng, endLat, endLng)).toStrictEqual(result);
      expect(driving).toBeCalledTimes(1);
      expect(driving).toBeCalledWith(startLat, startLng, endLat, endLng);

      await crawling.getNearbyHospitals(emogList);
      expect(crawl).toBeCalledTimes(1);
      expect(crawl).toBeCalledWith(emogList);
    });
  });
});
