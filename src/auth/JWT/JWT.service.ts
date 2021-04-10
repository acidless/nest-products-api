import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from '../../user/schemas/UserSchema';

/*====================*/

@Injectable()
export class JWTService {
  private KEY = 'rubtid10';

  public generateToken(id: string, email: string, password: string) {
    const token = jwt.sign({ id, email, password }, this.KEY);
    return 'Bearer ' + token;
  }

  public getTokenData(token: string): UserDocument {
    const data = token ? jwt.decode(token.slice(7)) : undefined;

    return data as UserDocument;
  }
}
