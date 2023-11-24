import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { IUserRepository } from '../../irepositories/user/i-user.repository.interface';
import { GenericService } from 'src/common/domain/service/generic.service';
import { CreateUserDto } from 'src/sso/application/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/sso/application/dto/user/update-user.dto';
import { User } from '../../models/user/user.model';

@Injectable()
export class UserService<C extends CreateUserDto, U extends UpdateUserDto, E extends User> extends GenericService<
  C,
  U,
  E,
  IUserRepository<E, E>
> {
  constructor(public readonly userRepository: IUserRepository<E, E>) {
    super(userRepository);
  }
}
