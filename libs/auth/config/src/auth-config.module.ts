import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { authConfig } from './auth.config';
import { jwtConfig } from './jwt.config';

const ENV_USERS_FILE_PATH = 'apps/auth/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class AuthConfigModule {}
