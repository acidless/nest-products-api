import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeProductsModule } from './me-products/me-products.module';

/*====================*/

@Module({
  imports: [MeProductsModule],
  controllers: [MeController],
})
export class MeModule {}
