// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

// IRepository
import { IUserGroupRoleRepository } from 'src/sso/domain/irepositories/user-group-role.repository.interface';

// Entity
import { UserGroupRoleEntity } from '../entities/user-group-role.entity';

// Interface
import { UserGroupRole } from 'src/sso/domain/models/user-group-role.model';

@Injectable()
export class UserGroupRoleRepository extends GenericRepository<UserGroupRole> implements IUserGroupRoleRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserGroupRoleEntity, dataSource);
  }

  relations(): (object: UserGroupRole) => any {
    return () => [];
  }
}
