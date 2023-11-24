import { ID, ScopeUser } from 'src/common/application/types/types.types';
import { IRole } from 'src/sso/domain/models/role.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblRoles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn('uuid', { name: 'Role_uuid' })
  id: ID;

  @Column({ name: 'Role_strName', unique: true })
  name: string;

  @Column({ name: 'Role_strDescription' })
  description: string;

  @Column({ name: 'Role_enumScope' })
  scope: ScopeUser;

  @Column({ name: 'Role_intHierarchy' })
  hierarchy: number;
}
