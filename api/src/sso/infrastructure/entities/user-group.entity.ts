// Dependencies
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Interface
import { IUserGroup } from 'src/sso/domain/models/user-group.model';

// Types
import { ID } from 'src/common/application/types/types.types';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';

@Entity({ name: 'tblUserGroups' })
export class UserGroupEntity implements IUserGroup {
  @PrimaryGeneratedColumn('uuid', { name: 'UserGroup_uuid' })
  id: ID;

  @Column({ name: 'UserGroup_strName', unique: true })
  name: string;

  @Column({ name: 'UserGroup_strDescription' })
  description: string;

  @Column({ name: 'UserGroup_intHierarchy' })
  hierarchy: number;

  @Column({ name: 'UserGroup_enumScope', enum: UserTypeEnum, enumName: 'UserGroup_enumScope' })
  scope: UserTypeEnum;
}
