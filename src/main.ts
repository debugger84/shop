import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {ConfigFactory} from './config/service/config.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = ConfigFactory.createCurrentConfig();
  if (!configService.isProduction()) {

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
        .setTitle('Item API')
        .setDescription('My Item API')
        .build());

    SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  await app.listen(3000);
}
bootstrap();
