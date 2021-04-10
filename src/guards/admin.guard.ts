import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import JSendSerializer from 'r-jsend';

@Injectable()
export class AdminGuard implements CanActivate {
  public constructor(
    private jsendSerializer: JSendSerializer,
    private authGuard: AuthGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.authGuard.canActivate(context);

    const request = context.switchToHttp().getRequest();

    if (!request.user.isAdmin) {
      throw new ForbiddenException(
        this.jsendSerializer
          .failResponse('You must be an admin to do this!')
          .get(),
      );
    }

    return true;
  }
}
