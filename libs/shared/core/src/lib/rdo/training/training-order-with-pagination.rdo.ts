import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TrainingOrderRdo } from './training-order.rdo';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { ValidateNested } from 'class-validator';
import { TrainingOrderWithPagination } from '../../types/training-order-with-pagination.type';
import { PaginationRdo } from '../training-with-pagination.rdo';

export class TrainingOrderWithPaginationRdo
  extends PaginationRdo
  implements TrainingOrderWithPagination
{
  @ApiProperty(TrainingOrderProperty.Orders.Description)
  @Type(() => TrainingOrderRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingOrderRdo[];
}
