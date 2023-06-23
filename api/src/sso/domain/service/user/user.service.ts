import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../irepositories/user/i-user.repository.interface';
import { GenericService } from 'src/common/domain/service/generic.service';

@Injectable()
export class UserService<C = any, U = any, E = any> extends GenericService<C, U, E, IUserRepository<E, E>> {
  constructor(public readonly userRepository: IUserRepository<E, E>) {
    super(userRepository);
  }
}
