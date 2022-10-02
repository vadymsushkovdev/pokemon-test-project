import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.get<number>('BACKEND_PORT');

  const options = new DocumentBuilder()
    .setTitle('PokemonApp swagger')
    .setVersion('1.0')
    .addTag('PokemonApp')
    .addServer(`http://localhost:${port}/api`)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/swagger', app, document);

  app.setGlobalPrefix('api/');

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
}
bootstrap();
