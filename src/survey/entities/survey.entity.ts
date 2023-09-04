import { CoreEntity } from '../../common/entities/core.entity';
import { Entity, Column } from 'typeorm';

export enum BuyingFactors {
  BRAND = 'BRAND',
  FUNDING = 'FUNDING',
  PERFORMANCE = 'PERFORMANCE',
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  OTHER = 'OTHER',
}


@Entity()
export class Survey extends CoreEntity {

  @Column()
  fullName: string;

  @Column()
  identification: number;

  @Column()
  carModel: string;

  @Column('enum', { enum: BuyingFactors })
  buyingFactors: BuyingFactors;

  @Column()
  drivingRating: number;

  @Column()
  satisfactionRating: number;
}

