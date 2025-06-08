import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';
import {
  FriendQuery,
  FriendSortDefault,
  PaginationResult,
} from '@project/shared-core';
import { calculatePage } from '@project/shared-helpers';

import { FriendEntity } from './friend.entity';
import { FriendFactory } from './friend.factory';
import { FriendModel } from './friend.model';

@Injectable()
export class FriendRepository extends BaseMongoRepository<
  FriendEntity,
  FriendModel
> {
  constructor(
    entityFactory: FriendFactory,
    @InjectModel(FriendModel.name) friendModel: Model<FriendModel>
  ) {
    super(entityFactory, friendModel);
  }

  public async find(
    query: FriendQuery
  ): Promise<PaginationResult<FriendEntity>> {
    const { userId, friendId, limit, page } = query;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const filter: FilterQuery<FriendModel> = friendId
      ? {
          $or: [
            { userId: userId, friendId: friendId },
            { userId: friendId, friendId: userId },
          ],
        }
      : {
          $or: [{ userId: userId }, { friendId: userId }],
        };

    const [records, friendCount] = await Promise.all([
      this.model
        .find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ [FriendSortDefault.Type]: FriendSortDefault.Direction })
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: calculatePage(friendCount, limit),
      itemsPerPage: limit,
      totalItems: friendCount,
    };
  }

  public async findFriend(
    userId: string,
    friendId: string
  ): Promise<FriendEntity | null> {
    const record = await this.model
      .findOne({
        $or: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId },
        ],
      })
      .exec();
    if (!record) {
      return null;
    }
    return this.createEntityFromDocument(record);
  }
}
