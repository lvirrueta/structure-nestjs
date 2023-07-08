import { IToken } from 'src/sso/domain/models/token.model';
import { ID } from 'src/common/application/types/types.types';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblTokens' })
export class TokenEntity implements IToken {
  @PrimaryGeneratedColumn('uuid', { name: 'Token_uuid' })
  id: ID;

  @Column({ name: 'Token_strName', type: 'varchar' })
  userID: ID;

  @CreateDateColumn({ name: 'Token_dtmCreatedAt' })
  createdAt: string;
}
