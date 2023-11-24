import { IToken } from 'src/sso/domain/models/token.model';
import { ID } from 'src/common/application/types/types.types';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblTokens' })
export class TokenEntity implements IToken {
  @PrimaryGeneratedColumn('uuid', { name: 'Token_uuid' })
  id: ID;

  @Column({ name: 'User_uuid', type: 'varchar' })
  userID: ID;

  @Column({ name: 'Token_dtmExpireIn', type: 'varchar' })
  expiresIn: number;

  @CreateDateColumn({ name: 'Token_dtmCreatedAt' })
  createdAt: string;
}
