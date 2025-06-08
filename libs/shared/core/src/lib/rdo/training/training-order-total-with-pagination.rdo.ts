import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import {
  TrainingMyOrderTotalRdo,
  TrainingOrderTotalRdo,
} from './training-order-total.rdo';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { ValidateNested } from 'class-validator';
import { PaginationRdo } from '../pagination.rdo';

export class TrainingOrderTotalWithPaginationRdo extends PaginationRdo {
  @ApiProperty(TrainingOrderProperty.Orders.Description)
  @Type(() => TrainingOrderTotalRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingOrderTotalRdo[];
}

export class TrainingMyOrderTotalWithPaginationRdo extends PaginationRdo {
  @ApiProperty(TrainingOrderProperty.Orders.Description)
  @Type(() => TrainingMyOrderTotalRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingMyOrderTotalRdo[];
}
