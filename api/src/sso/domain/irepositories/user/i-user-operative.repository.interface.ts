import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { IUserOperative, UserOperative } from '../../models/user/user-operative.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserOperativeRepository extends IGenericRepository<UserOperative, Partial<IUserOperative>> {}
