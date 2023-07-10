/* eslint-disable @typescript-eslint/no-empty-interface */
import { IRole, Role } from '../models/role.model';
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface IRoleRepository extends IGenericRepository<Role, Partial<IRole>> {}
