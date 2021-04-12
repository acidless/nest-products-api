import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeProductsModule } from './me-products/me-products.module';
import { MeTransactionsModule } from './me-transactions/me-transactions.module';

/*====================*/

@Module({
  imports: [MeProductsModule, MeTransactionsModule],
  controllers: [MeController],
})
export class MeModule {}
