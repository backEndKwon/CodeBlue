import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Reports } from '../reports/reports.entity';

@Entity()
export class Hospitals extends BaseEntity {
  @PrimaryGeneratedColumn()
  hospital_id: number;

  @Column()
  name: string;

  @Column()
  address?: string;

  @Column()
  phone: string;

  @Column('int')
  available_beds: number;

  @Column()
  latitude?: number;

  @Column()
  longitude?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany(() => Reports, (report) => report.hospital)
  reports: Reports[];
}
