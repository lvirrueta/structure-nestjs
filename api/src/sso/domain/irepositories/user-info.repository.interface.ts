/* eslint-disable @typescript-eslint/no-empty-interface */
import { IUserInfo, UserInfo } from '../models/user-info.model';
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface IUserInfoRepository extends IGenericRepository<UserInfo, IUserInfo> {}
