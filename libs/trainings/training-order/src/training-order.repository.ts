import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/training-models';
import {
  PaginationResult,
  TrainingOrder,
  TrainingOrderQuery,
  TrainingOrderTotal,
} from '@project/shared-core';

import { TrainingOrderEntity } from './training-order.entity';
import { TrainingOrderFactory } from './training-order.factory';
import { calculatePage } from '@project/shared-helpers';

@Injectable()
export class TrainingOrderRepository extends BasePostgresRepository<
  TrainingOrderEntity,
  TrainingOrder
> {
  private readonly logger = new Logger(TrainingOrderRepository.name);

  constructor(
    entityFactory: TrainingOrderFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getCount(where: Prisma.OrderWhereInput): Promise<number> {
    return this.client.order.count({ where });
  }

  public async insert(
    entity: TrainingOrderEntity
  ): Promise<TrainingOrderEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.order.create({
      data: pojoEntity,
    });
    return this.createEntityFromDocument(record);
  }

  public override async update(
    entity: TrainingOrderEntity
  ): Promise<TrainingOrderEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.order.update({
      where: { id: entity.id },
      data: pojoEntity,
    });
    return this.createEntityFromDocument(record);
  }

  public override async findById(
    id: TrainingOrderEntity['id']
  ): Promise<TrainingOrderEntity> {
    const record = await this.client.order.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`Покупка тренировки с id ${id} не найдена`);
    }
    return this.createEntityFromDocument(record);
  }

  public async findByUserId(
    query: TrainingOrderQuery
  ): Promise<PaginationResult<TrainingOrderEntity>> {
    const page = query?.page ?? 1;
    const skip = page && query?.limit ? (page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.OrderWhereInput = {};
    const orderBy: Prisma.OrderOrderByWithRelationInput = {};

    where.userId = query.userId;

    if (query.activeOnly) {
      where.isDone = false;
    }

    if (query.trainingId) {
      where.trainingId = query.trainingId;
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }
    const [records, count] = await Promise.all([
      this.client.order.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.getCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: page,
      totalPages: calculatePage(count, take),
      itemsPerPage: take,
      totalItems: count,
    };
  }

  public async findTrainingByUserId(
    query: TrainingOrderQuery
  ): Promise<PaginationResult<TrainingOrderTotal>> {
    const { limit, userId, activeOnly, page = 1 } = query;
    const skip = page && query?.limit ? (page - 1) * query.limit : undefined;
    const take = query?.limit;
    try {
      const records = await this.client.$queryRaw<any[]>`
        SELECT
          o.training_id as "trainingId",
          max(o.create_date) createDate,
          0::int as quantity,
          price::int as amount,
          (count(1) over())::int count
        FROM
          orders o
        WHERE
          o.user_id = '${Prisma.raw(userId)}'
          ${activeOnly ? Prisma.sql`AND NOT o.is_done` : Prisma.empty}
        GROUP BY
          o.training_id,
          o.price
        ORDER BY
          createDate DESC
        LIMIT ${limit}
        OFFSET ${skip}
      `;

      if (records.length === 0) {
        return null;
      }
      const count = records[0].count;
      return {
        entities: records.map(({ count, createdate, ...rest }) => rest),
        currentPage: page,
        totalPages: calculatePage(count, take),
        itemsPerPage: take,
        totalItems: count,
      };
    } catch (error) {
      this.logger.error('Ошибка при отборе купленных тренировок', error);
      return null;
    }
  }

  public async findByCoachId(
    query: TrainingOrderQuery
  ): Promise<PaginationResult<TrainingOrderTotal>> {
    const { page = 1, limit, userId, sortBy, sortDirection } = query;
    const skip = page && query?.limit ? (page - 1) * query.limit : undefined;
    const take = query?.limit;
    try {
      const orderBy = sortBy
        ? Prisma.sql`ORDER BY ${Prisma.raw(sortBy)} ${Prisma.raw(sortDirection || 'DESC')}`
        : Prisma.sql`ORDER BY create_date DESC`;
      const records = await this.client.$queryRaw<any[]>`
        SELECT
          o.training_id as "trainingId",
          min(t.create_date) createDate,
          sum(o.quantity)::int quantity,
          sum(o.amount)::int amount,
          (count(1) over())::int count
        FROM
          orders o
        JOIN
          trainings t ON o.training_id = t.id
        WHERE
          o.training_id = t.id
          AND t.coach_id = '${Prisma.raw(userId)}'
        GROUP BY
          o.training_id
        ${orderBy}
        LIMIT ${limit}
        OFFSET ${skip}
      `;
      if (records.length === 0) {
        return null;
      }
      const count = records[0].count;
      return {
        entities: records.map(({ count, createDate, ...rest }) => rest),
        currentPage: page,
        totalPages: calculatePage(count, take),
        itemsPerPage: take,
        totalItems: count,
      };
    } catch (error) {
      this.logger.error(
        'Ошибка при отборе купленных тренировок с итогами',
        error
      );
      return null;
    }
  }
}
