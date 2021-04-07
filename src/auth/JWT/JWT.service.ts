import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/*====================*/

@Injectable()
export class JWTService {
  private KEY = 'rubtid10';

  public generateToken(id: string, email: string, password: string) {
    const token = jwt.sign({ id, email, password }, this.KEY);
    return 'Bearer ' + token;
  }

  public getTokenData(token: string) {
    const data = token ? jwt.decode(token.slice(7)) : undefined;

    return data;
  }
}
