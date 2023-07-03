import { UserEntity } from 'src/sso/infrastructure/entities/user/user.entity';
import { IUserInfo } from '../user-info.model';
import { ID } from 'src/common/application/types/types.types';

export interface IUser {
  id: ID;
  username: string;
  password: string;
  createdAt: string;
  updateAt: string;
  hierarchy: number;
  // TODO
  userInfo: IUserInfo;
  userInfoId: ID;

  // idUserInfo: string;
  // userGroup: IUserGroup;
  // idUserGroup: string;
}

export class User extends UserEntity implements IUser {}
