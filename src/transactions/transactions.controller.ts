import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { TransactionsService } from './transactions.service';
import JSendSerializer from 'r-jsend';
import { Filter } from '../decorators/filter.decorator';

/*====================*/

@Controller('transactions')
@UseGuards(AdminGuard)
export class TransactionsController {
  public constructor(
    private transactionsService: TransactionsService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get()
  public async getAll(@Query('p') page, @Filter() filter) {
    const transactions = await this.transactionsService.getAll(
      page || 1,
      filter,
    );

    return this.jsendSerializer.successResponse(transactions).get();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const transaction = await this.transactionsService.getOneById(id);

    return this.jsendSerializer.successResponse(transaction).get();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    const transaction = await this.transactionsService.delete(id);

    return this.jsendSerializer.successResponse(transaction).get();
  }
}
