import { Injectable } from '@nestjs/common';

import {
  CreateOrderDto,
  TrainingOrderRdo,
  TrainingOrderTotalWithPaginationRdo,
} from '@project/shared-core';
import { fillDto } from '@project/shared-helpers';

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
  ): Promise<TrainingOrderTotalWithPaginationRdo | null> {
    return await this.trainingOrderRepository.findTrainingByUserId(query);
  }

  public async getOrdersTotal(
    query: TrainingOrderQuery
  ): Promise<TrainingOrderTotalWithPaginationRdo | null> {
    return await this.trainingOrderRepository.findByCoachId(query);
  }

  public async createOrder(dto: CreateOrderDto): Promise<TrainingOrderRdo> {
    const record = TrainingOrderFactory.createNewOrder(dto);
    await this.trainingOrderRepository.insert(record);
    return fillDto(TrainingOrderRdo, record.toPOJO());
  }
}
