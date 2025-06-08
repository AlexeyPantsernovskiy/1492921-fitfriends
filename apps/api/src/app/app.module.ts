import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ClientConfig } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TrainingsController } from './trainings.controller';
import { OrderController } from './orders.controller';
import { FriendController } from './friend.controller';
@Module({
  imports: [
    HttpModule.register({
      timeout: ClientConfig.HttpTimeout,
      maxRedirects: ClientConfig.HttpMaxRedirects,
    }),
  ],
  controllers: [
    UsersController,
    FriendController,
    TrainingsController,
    OrderController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
