import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

import { CommonProperty } from '../swagger/common-property';
import { LimitQuery } from './limit.query';
import { DEFAULT_PAGE } from '../constants/pagination.constant';

export class PaginationQuery extends LimitQuery {
  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? DEFAULT_PAGE : parsed;
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  public page?: number = DEFAULT_PAGE;
}
