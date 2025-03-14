import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@project/user';
import { AuthConfigModule, getMongooseOptions } from '@project/auth-config';

@Module({
  imports: [
    UserModule,
    AuthConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
