import { ProductGuard } from './product.guard';

describe('ProductGuard', () => {
  it('should be defined', () => {
    expect(new ProductGuard(null, null)).toBeDefined();
  });
});
