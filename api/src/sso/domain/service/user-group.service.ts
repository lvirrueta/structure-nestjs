// Dependencies
import { Inject, Injectable } from '@nestjs/common';

// Service
import { GenericService } from 'src/common/domain/service/generic.service';

// Repository
import { UserGroupRepository } from 'src/sso/infrastructure/repositories/user-group.repository';

// Entity
import { UserGroup } from '../models/user-group.model';

// Interface
import { IUserGroupRepository } from '../irepositories/user-group.repository.interface';

// DTO
import { CreateUserGroupDto } from 'src/sso/application/dto/create-user-group.dto';
import { UpdateUserGroupDto } from 'src/sso/application/dto/update-user-group.dto';

@Injectable()
export class UserGroupService extends GenericService<CreateUserGroupDto, UpdateUserGroupDto, UserGroup, IUserGroupRepository> {
  constructor(@Inject(UserGroupRepository) public readonly userInfoRepository: IUserGroupRepository) {
    super(userInfoRepository);
  }
}
