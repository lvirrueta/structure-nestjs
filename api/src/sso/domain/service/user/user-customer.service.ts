import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomerRepository } from 'src/sso/infrastructure/repositories/user/user-customer.repository';
import { IUserCustomerRepository } from '../../irepositories/user/i-user-customer.repository.interface';
import { CreateUserCustomerDto } from 'src/sso/application/dto/user/create-user-customer.dto';
import { UpdateUserCustomerDto } from 'src/sso/application/dto/user/update-user-customer.dto';
import { IUserCustomer } from '../../models/user/user-customer.model';

@Injectable()
export class UserCustomerService extends UserService<CreateUserCustomerDto, UpdateUserCustomerDto, IUserCustomer> {
  constructor(@InjectRepository(UserCustomerRepository) public readonly userCustomerRepository: IUserCustomerRepository) {
    super(userCustomerRepository);
  }
}
