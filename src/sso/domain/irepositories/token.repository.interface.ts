/* eslint-disable @typescript-eslint/no-empty-interface */
import { IToken, Token } from '../models/token.model';
import { ID } from 'src/common/application/types/types.types';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface ITokenRepository {
  createToken(dto: Partial<IToken>): Promise<Token>;
  findToken(id: ID): Promise<Token>;
}
