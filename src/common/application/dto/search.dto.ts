import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { OrderBy } from './order-by.dto';
import { QueryPaginationDTO } from './query-pagination.dto';
import { IsOptional, IsEnum, ValidateNested, IsArray } from 'class-validator';

export enum Operator {
  EQUAL = '=',
  GREATER = '>',
  LESS = '<',
  GREATER_EQUAL = '>=',
  LESS_EQUAL = '<=',
  NOT_EQUAL = '!=',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  CONTAINS = 'CONTAINS',
}

export class Filters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  key: string[];

  @ApiPropertyOptional({ enum: Operator, default: Operator.CONTAINS })
  @IsOptional()
  @IsEnum(Operator)
  operator: Operator;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  value: string[];
}

export class Search extends QueryPaginationDTO {
  @ApiPropertyOptional({ type: [Filters] })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => Filters)
  filters?: Filters[] = [];

  @ApiPropertyOptional({ type: OrderBy })
  @IsOptional()
  @Type(() => OrderBy)
  orderBy?: OrderBy;
}
