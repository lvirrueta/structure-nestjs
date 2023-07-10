import { ID } from 'src/common/application/types/types.types';
import { RoleEntity } from 'src/sso/infrastructure/entities/role.entity';
import { UserTypeEnum } from '../enum/user.enum';

export interface IRole {
  id: ID;
  name: string;
  description: string;
  scope: UserTypeEnum;
  hierarchy: number;
}

export class Role extends RoleEntity implements IRole {}
