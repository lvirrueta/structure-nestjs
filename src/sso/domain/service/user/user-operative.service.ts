import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserOperativeRepository } from 'src/sso/infrastructure/repositories/user/user-operative.repository';
import { IUserOperativeRepository } from '../../irepositories/user/i-user-operative.repository.interface';
import { CreateUserOperativeDto } from 'src/sso/application/dto/user/create-user-operative.dto';
import { UpdateUserOperativeDto } from 'src/sso/application/dto/user/update-user-operative.dto';
import { UserOperative } from '../../models/user/user-operative.model';

@Injectable()
export class UserOperativeService extends UserService<CreateUserOperativeDto, UpdateUserOperativeDto, UserOperative> {
  constructor(@Inject(UserOperativeRepository) public readonly userOperativeRepository: IUserOperativeRepository) {
    super(userOperativeRepository);
  }
}
