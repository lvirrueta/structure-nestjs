/* eslint-disable @typescript-eslint/no-empty-interface */
import { IUserGroup, UserGroup } from '../models/user-group.model';
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface IUserGroupRepository extends IGenericRepository<UserGroup, Partial<IUserGroup>> {}
