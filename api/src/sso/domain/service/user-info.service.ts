// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Service
import { GenericService } from 'src/common/domain/service/generic.service';

// Repository
import { UserInfoRepository } from 'src/sso/infrastructure/repositories/user-info.repository';

// Entity
import { UserInfo } from '../models/user-info.model';

// Interface
import { IUserInfoRepository } from '../irepositories/user-info.repository.interface';

// DTO
import { CreateUserInfoDto } from 'src/sso/application/dto/create-user-info.dto';
import { UpdateUserInfoDto } from 'src/sso/application/dto/update-user-info.dto';

@Injectable()
export class UserInfoService extends GenericService<CreateUserInfoDto, UpdateUserInfoDto, UserInfo, IUserInfoRepository> {
  constructor(@InjectRepository(UserInfoRepository) public readonly userInfoRepository: IUserInfoRepository) {
    super(userInfoRepository);
  }
}
