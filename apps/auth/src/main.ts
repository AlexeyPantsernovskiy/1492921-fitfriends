import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import {
  BearerAuth,
  BearerAuthOption,
  FillCoachQuestionnaireDto,
  FillUserQuestionnaireDto,
} from '@project/shared-core';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The User service')
    .setDescription('User service API')
    .setVersion('1.0')
    .addBearerAuth(BearerAuthOption, BearerAuth.AccessToken)
    .addBearerAuth(BearerAuthOption, BearerAuth.RefreshToken)
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [FillUserQuestionnaireDto, FillCoachQuestionnaireDto],
  });
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Service AUTH is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
