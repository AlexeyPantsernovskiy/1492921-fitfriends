import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

import { CommonProperty } from '../swagger/common-property';
import { DEFAULT_LIMIT } from '../constants/pagination.constant';

export class LimitQuery {
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? DEFAULT_LIMIT : parsed;
  })
  @IsInt()
  @Min(1)
  public limit?: number = DEFAULT_LIMIT;
}
