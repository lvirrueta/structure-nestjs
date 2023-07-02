// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { UserBaseRepository } from './user.repository';

// IRepository
import { IUserAdminRepository } from 'src/sso/domain/irepositories/user/i-user-admin.repository.interface';

// Entity
import { UserAdminEntity } from '../../entities/user/user-admin.entity';

// Model
import { IUserAdmin, UserAdmin } from 'src/sso/domain/models/user/user-admin.model';

@Injectable()
export class UserAdminRepository extends UserBaseRepository<UserAdmin, IUserAdmin> implements IUserAdminRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserAdminEntity, dataSource);
  }
  testAdmin(): IUserAdmin {
    throw new Error('Method not implemented.');
  }
}
