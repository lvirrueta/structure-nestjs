// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

// IRepository
import { IUserGroupRepository } from 'src/sso/domain/irepositories/user-group.repository.interface';

// Entity
import { UserGroupEntity } from '../entities/user-group.entity';

// Interface
import { UserGroup } from 'src/sso/domain/models/user-group.model';

@Injectable()
export class UserGroupRepository extends GenericRepository<UserGroup> implements IUserGroupRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserGroupEntity, dataSource);
  }

  relations(): (object: UserGroup) => any {
    return () => [];
  }
}
