import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from '../../../transactions/transactions.service';
import JSendSerializer from 'r-jsend';
import { AuthGuard } from '../../../guards/auth.guard';
import { Filter } from '../../../decorators/filter.decorator';

/*====================*/

@Controller('me/transactions')
@UseGuards(AuthGuard)
export class MeTransactionsController {
  public constructor(
    private transactionsService: TransactionsService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get()
  public async getAll(@Query('p') page, @Req() request, @Filter() filter) {
    const transactions = await this.transactionsService.getAll(page || 1, {
      ...filter,
      buyer: request.user._id,
    });

    return this.jsendSerializer.successResponse(transactions).get();
  }

  @Get(':id')
  public async getOne(@Req() request, @Param('id') id: string) {
    const transaction = await this.transactionsService.getOneById(
      id,
      request.user._id,
    );

    return this.jsendSerializer.successResponse(transaction).get();
  }

  @Delete(':id')
  public async delete(@Req() request, @Param('id') id: string) {
    const transaction = await this.transactionsService.delete(
      id,
      request.user._id,
    );

    return this.jsendSerializer.successResponse(transaction).get();
  }
}
