import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';
import { IUserInfoRepository } from 'src/sso/domain/irepositories/user-info.repository.interface';

import { UserInfo } from 'src/sso/domain/models/user-info.model';
import { UserInfoEntity } from '../entities/user-info.entity';

@Injectable()
export class UserInfoRepository extends GenericRepository<UserInfo> implements IUserInfoRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserInfoEntity, dataSource);
  }
}
