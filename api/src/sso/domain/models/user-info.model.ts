import { ID } from 'src/common/application/types/types.types';
import { UserInfoEntity } from 'src/sso/infrastructure/entities/user-info.entity';

export interface IUserInfo {
  id: ID;
  name: string;
  paternalName: string;
  maternalName: string;
  email: string;
  phone: string;
  dateBirth: string;
  createdAt: string;
  updateAt: string;
}

export class UserInfo extends UserInfoEntity implements IUserInfo {}
