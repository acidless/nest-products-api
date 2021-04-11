import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { UserDocument } from '../user/schemas/UserSchema';
import JSendSerializer from 'r-jsend';

@Injectable()
export class ProductGuard implements CanActivate {
  public constructor(
    private productService: ProductService,
    private jsendSerializer: JSendSerializer,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const product = await this.productService.getOne(request.params.productId);

    if (
      (product.seller as UserDocument)?._id.toString() !==
      request.user._id.toString()
    ) {
      throw new ForbiddenException(
        this.jsendSerializer
          .failResponse('You must be a seller of this product to modity it!')
          .get(),
      );
    }

    return true;
  }
}
