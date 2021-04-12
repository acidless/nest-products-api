import { Test, TestingModule } from '@nestjs/testing';
import { ProductTransactionsController } from './product-transactions.controller';

describe('ProductTransactionsController', () => {
  let controller: ProductTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTransactionsController],
    }).compile();

    controller = module.get<ProductTransactionsController>(ProductTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
