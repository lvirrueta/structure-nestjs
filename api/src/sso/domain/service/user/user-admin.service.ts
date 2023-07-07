import { Inject, Injectable } from '@nestjs/common';
import { IUserAdminRepository } from '../../irepositories/user/i-user-admin.repository.interface';
import { UserService } from './user.service';
import { UserAdminRepository } from 'src/sso/infrastructure/repositories/user/user-admin.repository';
import { UserAdmin } from '../../models/user/user-admin.model';
import { CreateUserAdminDto } from 'src/sso/application/dto/user/create-user-admin.dto';
import { UpdateUserAdminDto } from 'src/sso/application/dto/user/update-user-admin.dto';

@Injectable()
export class UserAdminService extends UserService<CreateUserAdminDto, UpdateUserAdminDto, UserAdmin> {
  constructor(@Inject(UserAdminRepository) public readonly userAdminRepository: IUserAdminRepository) {
    super(userAdminRepository);
  }
}
