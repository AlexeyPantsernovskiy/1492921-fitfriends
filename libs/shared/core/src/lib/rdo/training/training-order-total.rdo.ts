import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { TrainingProperty } from '../../swagger/training/training-property';

export class TrainingOrderTotalRdo {
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
