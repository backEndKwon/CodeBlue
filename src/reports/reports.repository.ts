import { Repository, DataSource } from 'typeorm';
import { Reports } from './reports.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsRepository extends Repository<Reports> {
  constructor(private dataSource: DataSource) {
    super(Reports, dataSource.createEntityManager());
  }

  async findReport(report_id: number): Promise<Reports> {
    return await this.findOne({
      where: { report_id },
    });
  }

  async updatePatientLocation(
    report_id: number,
    longitude: number,
    latitude: number,
  ) {
    const report = await this.findOne({
      where: { report_id },
    });
    report.longitude = longitude;
    report.latitude = latitude;
    console.log('report: ', report);
    return await report.save();
  }

  async updateReportBeingSent(report_id: number) {
    const report = await this.findOne({
      where: { report_id },
    });
    report.is_sent = true;
    return await report.save();
  }

//hospital 조회시 사용하는 메서드
  async userLocation(report_id: number) {
    //사용자 위치(단일)
    const reports: Reports = (await this.find()).find(
      (data) => data.report_id === report_id,
    );
    return [reports.latitude, reports.longitude];
  }

}
