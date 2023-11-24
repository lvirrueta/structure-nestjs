import { IUserOperative, UserOperative } from '../../models/user/user-operative.model';
import { IUserRepository } from './i-user.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserOperativeRepository extends IUserRepository<UserOperative, Partial<IUserOperative>> {}
