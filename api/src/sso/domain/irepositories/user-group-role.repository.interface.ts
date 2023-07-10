/* eslint-disable @typescript-eslint/no-empty-interface */
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { IUserGroupRole, UserGroupRole } from '../models/user-group-role.model';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface IUserGroupRoleRepository extends IGenericRepository<UserGroupRole, Partial<IUserGroupRole>> {}
