import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TrainingOrder } from '../../types/training-order.interface';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { OrderType } from '../../types/order-type.enum';
import { TrainingProperty } from '../../swagger/training/training-property';
import { UserProperty } from '../../swagger/user/user-property';
import { PaymentType } from '../../types/payment-type.enum';
import { TrainingRdo } from './training.rdo';

export class TrainingOrderRdo implements TrainingOrder {
  @ApiProperty(TrainingOrderProperty.Id.Description)
  @Expose()
  public id: number;

  @ApiProperty(TrainingOrderProperty.Type.Description)
  @Expose()
  type: OrderType;

  @ApiProperty(TrainingProperty.Id.Description)
  @Expose()
  trainingId: number;

  @ApiProperty(UserProperty.Id.Description)
  @Expose()
  userId: string;

  @ApiProperty(TrainingProperty.Price.Description)
  @Expose()
  price: number;

  @ApiProperty(TrainingOrderProperty.Quantity.Description)
  @Expose()
  quantity: number;

  @ApiProperty(TrainingOrderProperty.Amount.Description)
  @Expose()
  amount: number;

  @ApiProperty(TrainingOrderProperty.PaymentType.Description)
  @Expose()
  paymentType: PaymentType;

  @ApiProperty(TrainingOrderProperty.PaymentType.Description)
  @Expose()
  isStarted: boolean;

  @ApiProperty(TrainingOrderProperty.DoneCount.Description)
  @Expose()
  doneCount: number;

  @ApiProperty(TrainingOrderProperty.IsDone.Description)
  @Expose()
  isDone: boolean;

  @ApiProperty(TrainingOrderProperty.CreateDate.Description)
  @Expose()
  createDate: Date;

  @ApiProperty(TrainingOrderProperty.Training.Description)
  @Expose()
  training?: TrainingRdo;
}
