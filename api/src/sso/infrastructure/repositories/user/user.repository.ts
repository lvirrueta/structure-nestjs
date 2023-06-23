// IRepository
import { IUserRepository } from 'src/sso/domain/irepositories/user/i-user.repository.interface';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

/** UserRepository */
export class UserRepository<M, I> extends GenericRepository<M> implements IUserRepository<M, I> {}
