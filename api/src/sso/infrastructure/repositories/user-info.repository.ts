import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';
import { IUserInfoRepository } from 'src/sso/domain/irepositories/user-info.repository.interface';

import { IUserInfo, UserInfo } from 'src/sso/domain/models/user-info.model';
import { UserInfoEntity } from '../entities/user-info.entity';
import { IRepositoryOpt } from 'src/common/domain/irepositories/i-repository.repository.interface';

@Injectable()
export class UserInfoRepository extends GenericRepository<UserInfo> implements IUserInfoRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserInfoEntity, dataSource);
  }

  relations(): (object: UserInfo) => any {
    return () => [];
  }

  public async createEntity(dto: IUserInfo, opt?: IRepositoryOpt): Promise<UserInfo> {
    dto.email = dto.email.toLowerCase();
    return await super.createEntity(dto, opt);
  }

  public async updateEntity(dto: IUserInfo, opt?: IRepositoryOpt): Promise<UserInfo> {
    dto.email = dto.email.toLowerCase();
    return await super.updateEntity(dto, opt);
  }
}
