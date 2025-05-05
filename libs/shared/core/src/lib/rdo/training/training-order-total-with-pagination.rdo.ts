import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TrainingOrderTotalRdo } from './training-order-total.rdo';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { ValidateNested } from 'class-validator';
import { CommonProperty } from '../../swagger/common-property';

export class TrainingOrderTotalWithPaginationRdo {
  @ApiProperty(TrainingOrderProperty.Orders.Description)
  @Type(() => TrainingOrderTotalRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingOrderTotalRdo[];

  @ApiProperty(CommonProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(CommonProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;
}
