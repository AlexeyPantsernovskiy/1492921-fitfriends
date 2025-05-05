import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The «Training» service')
    .setDescription('Training service API')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('application.port');
  await app.listen(port);
  Logger.log(
    `🚀 Service TRAININGS is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
