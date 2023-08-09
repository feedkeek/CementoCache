import { NestFactory } from '@nestjs/core';
import * as Express from 'express';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { WrongRequestException } from './shared';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigType } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<ApplicationConfigType> =
    app.get(ConfigService);

  app.use(Express.json({ limit: '50mb' }));
  app.use(Express.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]): WrongRequestException => {
        console.log('errors: ', errors);
        console.log('errors: ', JSON.stringify(errors, null, 2));

        return new WrongRequestException(
          'Validation Error!',
          configService.get('IS_DEVELOPMENT')
            ? errors[0]?.constraints ||
              errors[0]?.children[0]?.constraints ||
              errors
            : undefined,
        );
      },
    }),
  );

  const PORT = configService.get('PORT');

  await app.listen(PORT);
}
bootstrap();
