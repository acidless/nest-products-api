import { Test, TestingModule } from '@nestjs/testing';
import { MeTransactionsController } from './me-transactions.controller';

describe('MeTransactionsController', () => {
  let controller: MeTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeTransactionsController],
    }).compile();

    controller = module.get<MeTransactionsController>(MeTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
