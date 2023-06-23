import { UserEntity } from 'src/sso/infrastructure/entities/user/user.entity';

export interface IUser {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updateAt: string;
  hierarchy: number;
  // TODO
  // userInfo: IUserInfo;
  // idUserInfo: string;
  // userGroup: IUserGroup;
  // idUserGroup: string;
}

export class User extends UserEntity implements IUser {}
