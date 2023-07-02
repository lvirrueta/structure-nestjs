// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { UserBaseRepository } from './user.repository';

// IRepository
import { IUserCustomerRepository } from 'src/sso/domain/irepositories/user/i-user-customer.repository.interface';

// Entity
import { UserCustomerEntity } from '../../entities/user/user-customer.entity';

// Model
import { IUserCustomer, UserCustomer } from 'src/sso/domain/models/user/user-customer.model';

@Injectable()
export class UserCustomerRepository extends UserBaseRepository<UserCustomer, IUserCustomer> implements IUserCustomerRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserCustomerEntity, dataSource);
  }
}
