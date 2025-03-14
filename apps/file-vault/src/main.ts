import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Service FILE-VAULT is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
