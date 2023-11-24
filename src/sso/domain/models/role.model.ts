import { ID, ScopeUser } from 'src/common/application/types/types.types';
import { RoleEntity } from 'src/sso/infrastructure/entities/role.entity';

export interface IRole {
  id: ID;
  name: string;
  description: string;
  scope: ScopeUser;
  hierarchy: number;
}

export class Role extends RoleEntity implements IRole {}
