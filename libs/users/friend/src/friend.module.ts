import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FriendController } from './friend.controller';
import { FriendFactory } from './friend.factory';
import { FriendModel, FriendSchema } from './friend.model';
import { FriendRepository } from './friend.repository';
import { FriendService } from './friend.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendSchema },
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendRepository, FriendFactory, FriendService],
  exports: [],
})
export class FriendModule {}
