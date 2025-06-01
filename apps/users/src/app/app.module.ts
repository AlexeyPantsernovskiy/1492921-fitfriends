import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@project/user';
import { getMongooseOptions, UsersConfigModule } from '@project/users-config';

@Module({
  imports: [
    UserModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
