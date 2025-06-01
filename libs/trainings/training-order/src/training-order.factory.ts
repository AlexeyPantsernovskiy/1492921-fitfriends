import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import {
  CreateOrderDto,
  EntityFactory,
  TrainingOrder,
} from '@project/shared-core';

import { TrainingOrderEntity } from './training-order.entity';

@Injectable()
export class TrainingOrderFactory
  implements EntityFactory<TrainingOrderEntity>
{
  public create(entityPlainData: TrainingOrder): TrainingOrderEntity {
    return new TrainingOrderEntity(entityPlainData);
  }

  public static createNewOrder(dto: CreateOrderDto): TrainingOrderEntity {
    const newOrder = new TrainingOrderEntity();

    newOrder.id = undefined;
    newOrder.type = dto.type;
    newOrder.trainingId = dto.trainingId;
    newOrder.userId = dto.userId;
    newOrder.price = dto.price;
    newOrder.quantity = dto.quantity;
    newOrder.amount = dto.price * dto.quantity;
    newOrder.paymentType = dto.paymentType;
    newOrder.isStarted = false;
    newOrder.doneCount = 0;
    newOrder.isDone = false;
    newOrder.createDate = dayjs().toDate();

    return newOrder;
  }
}
