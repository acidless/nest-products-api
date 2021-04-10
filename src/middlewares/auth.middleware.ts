import { JWTService } from '../auth/JWT/JWT.service';
import { Inject, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';

/*====================*/

export class AuthMiddleware implements NestMiddleware {
  public constructor(
    @Inject(UserService.name) private userService: UserService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.cookies['token'];

    const user = new JWTService().getTokenData(token);

    if (user) {
      req.user = await this.userService.getMe(user.id);
    }

    next();
  }
}
