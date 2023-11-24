/* eslint-disable @typescript-eslint/no-empty-interface */
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { IUser, User } from '../../models/user/user.model';

/**
 * @param E - Model Entity
 * @param IE - Interface Entity
 */
export interface IUserRepository<E = User, IE = IUser> extends IGenericRepository<E, Partial<IE>> {
  findByUsername(username: string): Promise<E>;
}
