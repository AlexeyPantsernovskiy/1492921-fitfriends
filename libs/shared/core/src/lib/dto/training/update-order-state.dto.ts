import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { CreateOrderDto } from './create-order.dto';
import { TrainingOrderProperty } from '../../swagger/training/training-order-property';
import { OrderAction } from '../../types/order-action.enum';

export class UpdateOrderStateDto extends PickType(CreateOrderDto, [
  'trainingId',
  'userId',
]) {
  @ApiProperty(TrainingOrderProperty.Action.Description)
  @IsIn(Object.values(OrderAction))
  action: OrderAction;
}
