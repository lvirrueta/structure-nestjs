import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class QueryPaginationDTO {
  @ApiPropertyOptional({ example: 20 })
  @IsPositive()
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsPositive()
  @IsOptional()
  @IsNumber()
  offset?: number;
}
