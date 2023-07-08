/* eslint-disable @typescript-eslint/no-empty-interface */
import { IGenericRepositoryNTr } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { IToken, Token } from '../models/token.model';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface ITokenRepository extends IGenericRepositoryNTr<Token, Partial<IToken>> {}
