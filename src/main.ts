import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';

/*====================*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalFilters(new MongooseExceptionFilter());

  await app.listen(3000);
}

/*====================*/

bootstrap();
