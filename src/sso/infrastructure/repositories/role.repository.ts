// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

// IRepository
import { IRoleRepository } from 'src/sso/domain/irepositories/role.repository.interface';

// Entity
import { RoleEntity } from '../entities/role.entity';

// Interface
import { Role } from 'src/sso/domain/models/role.model';

@Injectable()
export class RoleRepository extends GenericRepository<Role> implements IRoleRepository {
  constructor(public readonly dataSource: DataSource) {
    super(RoleEntity, dataSource);
  }

  relations(): (object: Role) => any {
    return () => [];
  }
}
