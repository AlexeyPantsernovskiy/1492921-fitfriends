import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { CommonProperty } from '../swagger/common-property';

export class LimitQuery {
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public limit?: number;
}
