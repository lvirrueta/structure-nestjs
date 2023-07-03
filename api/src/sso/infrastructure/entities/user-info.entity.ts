import { ID } from 'src/common/application/types/types.types';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tblUsersInfo' })
export class UserInfoEntity implements IUserInfo {
  @PrimaryGeneratedColumn('uuid', { name: 'UserInfo_uuid' })
  id: ID;

  @Column({ name: 'UserInfo_strName' })
  name: string;

  @Column({ name: 'UserInfo_strPaternalName' })
  paternalName: string;

  @Column({ name: 'UserInfo_strMaternalName' })
  maternalName: string;

  @Column({ name: 'UserInfo_strEmail' })
  email: string;

  @Column({ name: 'UserInfo_strPhone', unique: true })
  phone: string;

  @Column({ name: 'UserInfo_dtmDateBirth' })
  dateBirth: string;

  @CreateDateColumn({ name: 'UserInfo_dtmCreatedAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'UserInfo_dtmUpdatedAt' })
  updateAt: string;
}
