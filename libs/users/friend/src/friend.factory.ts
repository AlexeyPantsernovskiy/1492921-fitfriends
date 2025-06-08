import { Injectable } from '@nestjs/common';

import { EntityFactory, Friend } from '@project/shared-core';

import { FriendEntity } from './friend.entity';

@Injectable()
export class FriendFactory implements EntityFactory<FriendEntity> {
  create(entityPlainData: Friend): FriendEntity {
    return new FriendEntity(entityPlainData);
  }
}
