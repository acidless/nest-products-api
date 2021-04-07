import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MongooseExceptionFilter } from './mongoose-exception.filter';
import { authMiddleware } from './middlewares/auth.middleware';

/*====================*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(authMiddleware);
  app.useGlobalFilters(new MongooseExceptionFilter());

  await app.listen(3000);
}

/*====================*/

bootstrap();
