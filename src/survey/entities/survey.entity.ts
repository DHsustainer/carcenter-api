import { CoreEntity } from '../../common/entities/core.entity';
import { Entity, Column } from 'typeorm';

export enum BuyingFactors {
  BRAND = 'La reputación de la marca',
  FUNDING = 'Las opciones de financiamiento',
  PERFORMANCE = 'El desempeño al manejarlo',
  RECOMMENDATIONS = 'Recomendaciones de amigos o familiares',
  OTHER = 'Otros'
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

