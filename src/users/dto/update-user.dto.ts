import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ example: 'password', description: 'password of the user' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password?: string;
}
