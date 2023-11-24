import { ID } from 'src/common/application/types/types.types';
import { UserGroupRoleEntity } from 'src/sso/infrastructure/entities/user-group-role.entity';
import { UserGroup } from './user-group.model';
import { Role } from './role.model';

export interface IUserGroupRole {
  id: ID;
  userGroup: UserGroup;
  userGroupID: ID;
  role: Role;
  roleID: ID;
}

export class UserGroupRole extends UserGroupRoleEntity implements IUserGroupRole {}
