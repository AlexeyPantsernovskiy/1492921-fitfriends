import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@project/data-access';
import { Comment, PaginationResult } from '@project/shared-core';
import { PrismaClientService } from '@project/training-models';

import { TrainingCommentEntity } from './training-comment.entity';
import { TrainingCommentFactory } from './training-comment.factory';
import { TrainingCommentQuery } from './training-comment.query';

@Injectable()
export class TrainingCommentRepository extends BasePostgresRepository<
  TrainingCommentEntity,
  Comment
> {
  constructor(
    entityFactory: TrainingCommentFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getCommentsCount(
    where: Prisma.CommentWhereInput
  ): Promise<number> {
    return this.client.comment.count({ where });
  }

  private calculateCommentPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: TrainingCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public override async findById(
    id: Comment['id']
  ): Promise<TrainingCommentEntity | null> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public override async deleteById(id: Comment['id']): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findByTrainingId(
    trainingId: Comment['trainingId'],
    query: TrainingCommentQuery
  ): Promise<PaginationResult<TrainingCommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = { trainingId };
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({ where, skip, take, orderBy }),
      this.getCommentsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentPage(commentsCount, take),
      itemsPerPage: take,
      totalItems: commentsCount,
    };
  }

  public async findByUserAndPostId(
    trainingId: Comment['trainingId'],
    userId: string
  ): Promise<TrainingCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: { trainingId, userId },
    });

    if (document) {
      return this.createEntityFromDocument(document);
    }

    return null;
  }
}
