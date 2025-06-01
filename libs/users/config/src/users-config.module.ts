import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { usersConfig } from './users.config';
import { jwtConfig } from './jwt.config';

const ENV_USERS_FILE_PATH = 'apps/users/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [usersConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class UsersConfigModule {}
