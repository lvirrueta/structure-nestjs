import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IUser, User } from 'src/sso/domain/models/user/user.model';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tblUsers' })
@TableInheritance({
  column: { type: 'enum', enum: UserTypeEnum, enumName: 'User_entType', name: 'User_entType' },
})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid', { name: 'User_uuid' })
  id: string;

  @Column({ name: 'User_strUsername' })
  username: string;

  @Column({ name: 'User_strPassword' })
  password: string;

  @Column({ name: 'User_intHierarchy' })
  hierarchy: number;

  @CreateDateColumn({ name: 'User_dtmCreatedAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'User_dtmUpdatedAt' })
  updateAt: string;
}
