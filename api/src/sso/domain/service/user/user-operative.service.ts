import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOperativeRepository } from 'src/sso/infrastructure/repositories/user/user-operative.repository';
import { IUserOperativeRepository } from '../../irepositories/user/i-user-operative.repository.interface';

@Injectable()
export class UserOperativeService extends UserService {
  constructor(@InjectRepository(UserOperativeRepository) public readonly userOperativeRepository: IUserOperativeRepository) {
    super(userOperativeRepository);
  }
}
