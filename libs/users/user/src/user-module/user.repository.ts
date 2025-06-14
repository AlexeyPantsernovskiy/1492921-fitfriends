import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';
import {
  PaginationResult,
  UserCatalogQuery,
  UserSortDefault,
} from '@project/shared-core';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';
import { calculatePage } from '@project/shared-helpers';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      return null;
    }
    const document = await this.model
      .findOne({ email: { $regex: new RegExp(email, 'i') } })
      .exec();
    return this.createEntityFromDocument(document);
  }

  public async find(
    query: UserCatalogQuery
  ): Promise<PaginationResult<UserEntity>> {
    const {
      role,
      isReadyToTrain,
      locations,
      specializations,
      level,
      limit,
      page,
      userId,
    } = query;
    const skip = page && limit ? (page - 1) * limit : undefined;
    const filter: FilterQuery<UserModel> = {};
    // Фильтр по роли
    if (role) {
      filter.role = role;
    }
    // Фильтр по готовности к тренировке
    if (isReadyToTrain !== undefined) {
      filter['questionnaire.isReadyToTrain'] = isReadyToTrain;
    }
    // Фильтр по локациям
    if (locations?.length) {
      filter.location = { $in: locations };
    }
    // Фильтр по специализациям
    if (specializations?.length) {
      filter['questionnaire.specialization'] = { $in: specializations };
    }
    // Фильтр по уровню подготовки
    if (level) {
      filter['questionnaire.level'] = level;
    }
    // Фильтр для исключения текущего пользователя
    if (userId) {
      filter['_id'] = { $ne: userId };
    }
    const [records, recordCount] = await Promise.all([
      this.model
        .find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ [UserSortDefault.Type]: UserSortDefault.Direction })
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: calculatePage(recordCount, limit),
      itemsPerPage: limit,
      totalItems: recordCount,
    };
  }
}
