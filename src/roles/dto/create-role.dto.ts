import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'The Role', description: 'Role name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
