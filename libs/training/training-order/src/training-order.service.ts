import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateOrderDto,
  OrderAction,
  SortDirection,
  SortType,
  TrainingOrder,
  TrainingOrderRdo,
  TrainingOrderTotalWithPaginationRdo,
  TrainingOrderWithPaginationRdo,
  UserRole,
} from '@project/shared-core';
import { fillDto } from '@project/shared-helpers';

import { UpdateOrderStateDto } from '../../../shared/core/src/lib/dto/training/update-order-state.dto';
import { TrainingOrderEntity } from './training-order.entity';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderQuery } from '../../../shared/core/src/lib/query/training-order.query';
import { TrainingOrderRepository } from './training-order.repository';

@Injectable()
export class TrainingOrderService {
  constructor(
    private readonly trainingOrderRepository: TrainingOrderRepository
  ) {}

  public async getOrders(
    query: TrainingOrderQuery
    //  ): Promise<TrainingOrderWithPaginationRdo | null> {
  ): Promise<TrainingOrderTotalWithPaginationRdo | null> {
    //const ordersWithPagination =
    return await this.trainingOrderRepository.findTrainingByUserId(query);
    // return {
    //   ...ordersWithPagination,
    //   entities: ordersWithPagination.entities.map((item) => item.toPOJO()),
    // };
  }

  public async getOrdersTotal(
    query: TrainingOrderQuery
  ): Promise<TrainingOrderTotalWithPaginationRdo | null> {
    return await this.trainingOrderRepository.findByCoachId(query);
  }

  // public async findActiveOrderByTrainingId(
  //   trainingId: TrainingOrder['trainingId'],
  //   userId: TrainingOrder['userId']
  // ): Promise<TrainingOrderEntity | null> {
  //   const orders = await this.getOrders({
  //     limit: 1,
  //     sortBy: SortType.Date,
  //     sortDirection: SortDirection.Asc,
  //     page: 1,
  //     activeOnly: true,
  //     trainingId,
  //     userId,
  //     role: UserRole.Sportsman,
  //   });
  //   if (!orders.entities.length) {
  //     return null;
  //   }
  //   return new TrainingOrderEntity(orders.entities[0]);
  // }

  public async createOrder(dto: CreateOrderDto): Promise<TrainingOrderRdo> {
    const record = TrainingOrderFactory.createNewOrder(dto);
    await this.trainingOrderRepository.insert(record);
    return fillDto(TrainingOrderRdo, record.toPOJO());
  }

  // public async updateState(
  //   dto: UpdateOrderStateDto
  // ): Promise<TrainingOrderRdo> {
  //   const entity = await this.findActiveOrderByTrainingId(
  //     dto.trainingId,
  //     dto.userId
  //   );

  //   if (!entity) {
  //     throw new NotFoundException(
  //       `Не найдена купленная тренировка с id = ${dto.trainingId}`
  //     );
  //   }

  //   if (dto.action === OrderAction.Start) {
  //     entity.isStarted = true;
  //   } else if (dto.action === OrderAction.Done) {
  //     entity.isStarted = false;
  //     entity.doneCount = entity.doneCount + 1;
  //     entity.isDone = entity.doneCount === entity.amount;
  //   }
  //   const record = await this.trainingOrderRepository.update(entity);
  //   return fillDto(TrainingOrderRdo, record.toPOJO());
  // }
}
