import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BuyingFactors } from '../entities/survey.entity';

export class CreateSurveyDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of client' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 1234567890, description: 'Identification of client' })
  @IsNotEmpty()
  @IsNumber()
  identification: number;

  @ApiProperty({ example: 'Hyundai', description: 'Car Model' })
  @IsNotEmpty()
  @IsString()
  carModel: string;

  @ApiProperty({
    example: 'Brand of the car',
    description: 'Buying factors',
  })
  @IsString()
  buyingFactors: BuyingFactors;

  @ApiProperty({ example: 5, description: 'Driving rating' })
  @IsNotEmpty()
  @IsNumber()
  drivingRating: number;

  @ApiProperty({ example: 5, description: 'Satisfaction rating' })
  @IsNotEmpty()
  @IsNumber()
  satisfactionRating: number;
}
