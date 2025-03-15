import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getJwtOptions } from '@project/auth-config';

import { UserController } from './user.controller';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { UserService } from './user.service';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserFactory,
    UserService,
    QuestionnaireService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class UserModule {}
