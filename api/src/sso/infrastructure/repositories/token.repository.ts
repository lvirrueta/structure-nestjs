// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

// IRepository
import { ITokenRepository } from 'src/sso/domain/irepositories/token.repository.interface';

// Entity
import { TokenEntity } from '../entities/token.entity';

// Interface
import { ID } from 'src/common/application/types/types.types';
import { IToken, Token } from 'src/sso/domain/models/token.model';

@Injectable()
export class TokenRepository extends GenericRepository<Token> implements ITokenRepository {
  constructor(public readonly dataSource: DataSource) {
    super(TokenEntity, dataSource);
  }

  relations(): (object: Token) => any {
    return () => [];
  }

  public async createToken(dto: Partial<IToken>): Promise<Token> {
    return await super.createEntity(dto);
  }

  public async findToken(id: ID): Promise<Token> {
    return await super.findOneEntity(id);
  }
}
