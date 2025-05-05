import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TrainingOrderRdo } from './training-order.rdo';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { ValidateNested } from 'class-validator';
import { CommonProperty } from '../../swagger/common-property';
import { TrainingOrderWithPagination } from '../../types/training-order-with-pagination.type';

export class TrainingOrderWithPaginationRdo
  implements TrainingOrderWithPagination
{
  @ApiProperty(TrainingOrderProperty.Orders.Description)
  @Type(() => TrainingOrderRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingOrderRdo[];

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
