import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomerRepository } from 'src/sso/infrastructure/repositories/user/user-customer.repository';
import { IUserCustomerRepository } from '../../irepositories/user/i-user-customer.repository.interface';

@Injectable()
export class UserCustomerService extends UserService {
  constructor(@InjectRepository(UserCustomerRepository) public readonly userCustomerRepository: IUserCustomerRepository) {
    super(userCustomerRepository);
  }
}
