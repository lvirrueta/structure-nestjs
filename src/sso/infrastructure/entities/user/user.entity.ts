// Dependencies
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  TableInheritance,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entity
import { UserInfoEntity } from '../user-info.entity';

// Interface
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

// Interface
import { IUser } from 'src/sso/domain/models/user/user.model';

// Enum
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';

// Types
import { ID } from 'src/common/application/types/types.types';

@Entity({ name: 'tblUsers' })
@TableInheritance({
  column: { type: 'enum', enum: UserTypeEnum, enumName: 'User_entType', name: 'User_entType' },
})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid', { name: 'User_uuid' })
  id: ID;

  @Column({ name: 'User_strUsername', unique: true })
  username: string;

  @Column({ name: 'User_strPassword', select: false })
  password: string;

  @Column({ name: 'User_intHierarchy' })
  hierarchy: number;

  @CreateDateColumn({ name: 'User_dtmCreatedAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'User_dtmUpdatedAt' })
  updateAt: string;

  @OneToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'UserInfo_uuid' })
  userInfo: IUserInfo;

  @Column({ name: 'UserInfo_uuid', nullable: true })
  userInfoId: ID;
}
