import { Module } from '@nestjs/common';
import { ProductTransactionsController } from './product-transactions.controller';
import { TransactionsModule } from '../../transactions/transactions.module';

/*====================*/

@Module({
  controllers: [ProductTransactionsController],
  imports: [TransactionsModule],
})
export class ProductTransactionsModule {}
