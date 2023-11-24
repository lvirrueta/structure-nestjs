// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { UserBaseRepository } from './user.repository';

// IRepository
import { IUserOperativeRepository } from 'src/sso/domain/irepositories/user/i-user-operative.repository.interface';

// Entity
import { UserOperativeEntity } from '../../entities/user/user-operative.entity';

// Model
import { IUserOperative, UserOperative } from 'src/sso/domain/models/user/user-operative.model';

@Injectable()
export class UserOperativeRepository extends UserBaseRepository<UserOperative, IUserOperative> implements IUserOperativeRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserOperativeEntity, dataSource);
  }
}
