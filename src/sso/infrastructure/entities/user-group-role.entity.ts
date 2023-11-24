// Dependencies
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

// Interface
import { IUserGroupRole } from 'src/sso/domain/models/user-group-role.model';

// Entity
import { RoleEntity } from './role.entity';
import { UserGroupEntity } from './user-group.entity';

// Model
import { Role } from 'src/sso/domain/models/role.model';
import { UserGroup } from 'src/sso/domain/models/user-group.model';

// Types
import { ID } from 'src/common/application/types/types.types';

@Entity({ name: 'tblUserGroup_Roles' })
@Unique(['userGroupID', 'roleID'])
export class UserGroupRoleEntity implements IUserGroupRole {
  @PrimaryGeneratedColumn('uuid', { name: 'UserGroupRole_uuid' })
  id: ID;

  @ManyToOne(() => UserGroupEntity)
  @JoinColumn({ name: 'UserGroup_uuid' })
  userGroup: UserGroup;

  @Column({ name: 'UserGroup_uuid' })
  userGroupID: ID;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'Role_uuid' })
  role: Role;

  @Column({ name: 'Role_uuid' })
  roleID: ID;
}
