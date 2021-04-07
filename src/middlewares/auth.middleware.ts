import { JWTService } from '../auth/JWT/JWT.service';

/*====================*/

export function authMiddleware(req: any, res: any, next: () => void) {
  const token = req.cookies['token'];

  req.user = new JWTService().getTokenData(token);
  next();
}
