import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Guitar } from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/shop-models';
import { calculatePage } from '@project/shared-helpers';

import { ShopProductEntity } from './shop-product.entity';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';

@Injectable()
export class ShopProductRepository extends BasePostgresRepository<
  ShopProductEntity,
  Guitar
> {
  constructor(
    entityFactory: ShopProductFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async insert(entity: ShopProductEntity): Promise<ShopProductEntity> {
    const pojoEntity = entity.toPOJO();
    // удаление избыточных полей (заполняется средствами СУБД)
    delete pojoEntity.id;
    const record = await this.client.guitar.create({
      data: pojoEntity,
    });
    return await this.findById(record.id);
  }

  public async update(entity: ShopProductEntity): Promise<ShopProductEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.guitar.update({
      where: { id: entity.id },
      data: pojoEntity,
    });
    return await this.findById(record.id);
  }

  public async delete(id: string): Promise<void> {
    await this.client.guitar.delete({
      where: { id },
    });
  }

  public async findById(id: string): Promise<ShopProductEntity> {
    const record = await this.client.guitar.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Товар с id ${id} не найден`);
    }
    return this.createEntityFromDocument(record);
  }

  private async getCount(where: Prisma.GuitarWhereInput): Promise<number> {
    return this.client.guitar.count({ where });
  }

  public async find(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ShopProductEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.GuitarWhereInput = {};
    const orderBy: Prisma.GuitarOrderByWithRelationInput = {};

    if (query?.typeCodes && query?.typeCodes.length) {
      where.typeCode = {
        in: query?.typeCodes,
      };
    }
    if (query?.countsStrings && query?.countsStrings.length) {
      where.countStrings = {
        in: query?.countsStrings,
      };
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, count] = await Promise.all([
      this.client.guitar.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: calculatePage(count, take),
      itemsPerPage: take,
      totalItems: count,
    };
  }
}
