import { ID, ScopeUser } from 'src/common/application/types/types.types';
import { UserGroupEntity } from 'src/sso/infrastructure/entities/user-group.entity';

export interface IUserGroup {
  id: ID;
  name: string;
  description: string;
  hierarchy: number;
  scope: ScopeUser;
}

export class UserGroup extends UserGroupEntity implements IUserGroup {}
