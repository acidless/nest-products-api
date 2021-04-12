import { Module } from '@nestjs/common';
import { MeTransactionsController } from './me-transactions.controller';
import { TransactionsModule } from '../../../transactions/transactions.module';

/*====================*/

@Module({
  controllers: [MeTransactionsController],
  imports: [TransactionsModule],
})
export class MeTransactionsModule {}
