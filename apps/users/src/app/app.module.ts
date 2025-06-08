import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@project/user';
import { FriendModule } from '@project/friend';
import { getMongooseOptions, UsersConfigModule } from '@project/users-config';

@Module({
  imports: [
    UserModule,
    FriendModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
