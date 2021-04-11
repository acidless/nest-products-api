import { Test, TestingModule } from '@nestjs/testing';
import { MeProductsController } from './me-products.controller';

describe('MeProductsController', () => {
  let controller: MeProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeProductsController],
    }).compile();

    controller = module.get<MeProductsController>(MeProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
