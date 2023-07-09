import { ID } from 'src/common/application/types/types.types';
import { UserGroupEntity } from 'src/sso/infrastructure/entities/user-group.entity';
import { UserTypeEnum } from '../enum/user.enum';

export interface IUserGroup {
  id: ID;
  name: string;
  description: string;
  hierarchy: number;
  scope: UserTypeEnum;
}

export class UserGroup extends UserGroupEntity implements IUserGroup {}
