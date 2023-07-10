import { ID } from 'src/common/application/types/types.types';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IRole } from 'src/sso/domain/models/role.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblRoles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn('uuid', { name: 'Role_uuid' })
  id: ID;

  @Column({ name: 'Role_strName' })
  name: string;

  @Column({ name: 'Role_strDescription' })
  description: string;

  @Column({ name: 'Role_enumScope', enum: UserTypeEnum, enumName: 'Role_enumScope' })
  scope: UserTypeEnum;

  @Column({ name: 'Role_intHierarchy' })
  hierarchy: number;
}
