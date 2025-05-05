import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';

import { currencyParser } from '@project/shared-helpers';

import { TrainingOrder } from '../../types/training-order.interface';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { OrderType } from '../../types/order-type.enum';
import { UserProperty } from '../../swagger/user/user-property';
import { TrainingProperty } from '../../../index-frontend';
import { Transform } from 'class-transformer';
import { PaymentType } from '../../types/payment-type.enum';

export class CreateOrderDto
  implements
    Omit<
      TrainingOrder,
      'id' | 'amount' | 'createDate' | 'isStarted' | 'doneCount' | 'isDone'
    >
{
  @ApiProperty(TrainingOrderProperty.Type.Description)
  @IsIn(Object.values(OrderType), {
    message: TrainingOrderProperty.Type.Validate.Message,
  })
  public type: OrderType;

  @ApiProperty(UserProperty.Id.Description)
  @IsString()
  @IsMongoId({ message: UserProperty.Id.Validate.Message })
  public userId!: string;

  @ApiProperty(TrainingProperty.Id.Description)
  @IsNumber()
  public trainingId: number;

  @ApiProperty(TrainingProperty.Price.Description)
  @Transform(({ value }) => currencyParser(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(TrainingProperty.Price.Validate.Min, {
    message: TrainingProperty.Price.Validate.Message,
  })
  price: number;

  @ApiProperty(TrainingOrderProperty.Quantity.Description)
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(TrainingOrderProperty.Quantity.Validate.Min)
  @Max(TrainingOrderProperty.Quantity.Validate.Max)
  public quantity: number;

  @ApiProperty(TrainingOrderProperty.PaymentType.Description)
  @IsIn(Object.values(PaymentType))
  public paymentType: PaymentType;
}
