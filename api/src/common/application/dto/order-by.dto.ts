import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class OrderBy {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty({ enum: OrderByEnum })
  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum;
}
