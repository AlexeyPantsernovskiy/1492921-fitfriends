import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { TrainingProperty } from '../../swagger/training/training-property';
import { TrainingRdo } from './training.rdo';
import { ValidateNested } from 'class-validator';
import { TrainingOrderTotal } from '../../types/training-order-total.interface';
import { TrainingMyOrderTotal } from '../../types/training-my-order-total.interface';

export class TrainingOrderTotalRdo implements TrainingOrderTotal {
  @ApiProperty(TrainingProperty.Id.Description)
  @Expose()
  trainingId: number;

  @ApiProperty(TrainingOrderProperty.QuantityTotal.Description)
  @Expose()
  quantity: number;

  @ApiProperty(TrainingOrderProperty.AmountTotal.Description)
  @Expose()
  amount: number;
}

export class TrainingMyOrderTotalRdo
  extends OmitType(TrainingOrderTotalRdo, ['trainingId'])
  implements TrainingMyOrderTotal
{
  @ApiProperty(TrainingOrderProperty.Training.Description)
  @Type(() => TrainingRdo)
  @ValidateNested({ always: true })
  @Expose()
  public training: TrainingRdo;
}
