import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from '../../transactions/transactions.service';
import JSendSerializer from 'r-jsend';
import { AuthGuard } from '../../guards/auth.guard';

/*====================*/

@Controller()
export class ProductTransactionsController {
  public constructor(
    private transactionsService: TransactionsService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Post('/products/:productId/buy')
  @UseGuards(AuthGuard)
  public async createTransaction(
    @Req() request,
    @Param('productId') productId: string,
  ) {
    const transaction = await this.transactionsService.create(
      productId,
      request.user._id,
    );

    return this.jsendSerializer.successResponse(transaction).get();
  }
}
