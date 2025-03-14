import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ClientConfig } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
//import { ShopController } from './shop.controller';
@Module({
  imports: [
    HttpModule.register({
      timeout: ClientConfig.HttpTimeout,
      maxRedirects: ClientConfig.HttpMaxRedirects,
    }),
  ],
  //controllers: [UsersController, ShopController],
  controllers: [UsersController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
