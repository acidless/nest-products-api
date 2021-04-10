import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import JSendSerializer from 'r-jsend';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private jsendSerializer: JSendSerializer) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException(
        this.jsendSerializer
          .failResponse('You must be authorized to do this')
          .get(),
      );
    }

    return true;
  }
}
