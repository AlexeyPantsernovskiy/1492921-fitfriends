import { Prisma } from '@prisma/client';

import { PrismaClientService } from '@project/training-models';
import { BasePostgresRepository } from '@project/data-access';
import { calculatePage } from '@project/shared-helpers';
import {
  PaginationResult,
  Sex,
  SpecialForYouQuery,
  Training,
  TrainingParamWeight,
  TrainingQuery,
} from '@project/shared-core';

import { TrainingEntity } from './training.entity';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TrainingFactory } from './training.factory';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<
  TrainingEntity,
  Training
> {
  private readonly logger = new Logger(TrainingRepository.name);

  constructor(entityFactory: TrainingFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.client.training.count({ where });
  }

  private getRangeCondition(
    field: string,
    min?: number,
    max?: number
  ): Record<string, object> | undefined {
    if ((min || min === 0) && (max || max === 0)) {
      return min === max
        ? { [field]: { equals: max } }
        : { [field]: { gte: min, lte: max } };
    }
    const condition: Record<string, number> = {};
    if (min) {
      condition.gte = min;
    }
    if (max) {
      condition.lte = max;
    }
    return Object.keys(condition).length ? { [field]: condition } : undefined;
  }

  public async getMaxPrice(): Promise<number> {
    const maxPrice = await this.client.training.aggregate({
      _max: {
        price: true,
      },
    });
    return maxPrice._max.price;
  }

  public override async findById(
    id: TrainingEntity['id']
  ): Promise<TrainingEntity> {
    const record = await this.client.training.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`Тренировка с id ${id} не найдена`);
    }
    return this.createEntityFromDocument(record);
  }

  public async find(
    query?: TrainingQuery
  ): Promise<PaginationResult<TrainingEntity> & { maxAllPrice: number }> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    Object.assign(
      where,
      this.getRangeCondition('price', query.minPrice, query.maxPrice)
    );
    Object.assign(
      where,
      this.getRangeCondition('calories', query.minCalories, query.maxCalories)
    );
    Object.assign(
      where,
      this.getRangeCondition('rating', query.minRating, query.maxRating)
    );

    if (query.specializations?.length) {
      where.specialization = { in: query.specializations };
    }

    if (query.durations?.length) {
      where.duration = { in: query.durations };
    }

    if (query.coachId) {
      where.coachId = query.coachId;
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }
    const [records, count, maxPrice] = await Promise.all([
      this.client.training.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getCount(where),
      this.getMaxPrice(),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: calculatePage(count, take),
      itemsPerPage: take,
      totalItems: count,
      maxAllPrice: maxPrice,
    };
  }

  public async findSpecialForYou(
    query: SpecialForYouQuery
  ): Promise<Training[]> {
    const { limit, specializations, sex, level, duration, calories } = query;
    try {
      const records = await this.client.$queryRaw<Training[]>`
        SELECT
          *,
          (
            (CASE WHEN specialization::text = ANY(${specializations}::text[]) THEN ${TrainingParamWeight.Specialization} ELSE 0 END) +
            (CASE
              WHEN sex::text = ${sex}::text THEN ${TrainingParamWeight.Sex}
              WHEN sex::text = ${Sex.Empty}::text THEN ${TrainingParamWeight.Sex}
              WHEN ${sex}::text = ${Sex.Empty}::text THEN ${TrainingParamWeight.Sex * 0.5}
              ELSE 0
            END) +
            (CASE WHEN level::text = ${level}::text THEN ${TrainingParamWeight.Level} ELSE 0 END) +
            (CASE WHEN duration::text = ${duration}::text THEN ${TrainingParamWeight.Duration} ELSE 0 END)
          ) AS relevance_score,
          ABS(calories - ${calories}) AS calories_diff
        FROM
          trainings
        WHERE
          (
            specialization::text = ANY(${specializations}::text[])
            OR
            sex::text = ${sex}::text OR sex::text = ${Sex.Empty}::text OR ${sex}::text = ${Sex.Empty}::text
            OR
            level::text = ${level}::text
            OR
            duration::text = ${duration}::text
          )
        ORDER BY
          relevance_score DESC,
          calories_diff ASC,
          rating DESC
        ${limit ? Prisma.sql`LIMIT ${limit}` : Prisma.empty}
      `;

      return records;
    } catch (error) {
      this.logger.error(
        'Ошибка при поиске тренировок, специально подобранных ждя Вас',
        error
      );
      return [];
    }
  }

  public async insert(training: TrainingEntity): Promise<TrainingEntity> {
    const pojoTraining = training.toPOJO();
    const record = await this.client.training.create({
      data: pojoTraining,
    });
    return this.createEntityFromDocument(record);
    //return await this.findById(record.id);
  }

  public async update(training: TrainingEntity): Promise<TrainingEntity> {
    const pojoEntity = training.toPOJO();
    const record = await this.client.training.update({
      where: { id: training.id },
      data: pojoEntity,
    });
    return this.createEntityFromDocument(record);
    //return await this.findById(record.id);
  }
}
