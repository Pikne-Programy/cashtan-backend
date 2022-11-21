import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { cors } from 'common/cors';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(cors);

  const config = app.get(ConfigService);

  await app.listen(config.get('PORT', 8080));
}
bootstrap();
