import { Test, TestingModule } from '@nestjs/testing';
import { MeProductsCategoriesController } from './me-products-categories.controller';

describe('MeProductsCategoriesController', () => {
  let controller: MeProductsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeProductsCategoriesController],
    }).compile();

    controller = module.get<MeProductsCategoriesController>(MeProductsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
