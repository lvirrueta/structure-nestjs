import { ID } from 'src/common/application/types/types.types';
import { TokenEntity } from 'src/sso/infrastructure/entities/token.entity';

export interface IToken {
  id: ID;
  userID: ID;
  createdAt: string;
}

export class Token extends TokenEntity implements IToken {}
