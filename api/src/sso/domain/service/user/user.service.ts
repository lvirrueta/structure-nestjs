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

  public override async create(dto: C): Promise<E> {
    dto.password = this.hashPassword(dto.password);
    return await this.repository.createEntity(dto as any);
  }

  public override async update(dto: U): Promise<E> {
    dto.password = this.hashPassword(dto.password);
    return await this.repository.updateEntity(dto as any);
  }

  /** hash Password
   * @param password
   * @param saltRounds
   */
  private hashPassword(password: string, saltRounds = 10): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
