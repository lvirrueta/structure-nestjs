// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Model
import { UserEntity } from '../../entities/user/user.entity';
import { IUser, User } from 'src/sso/domain/models/user/user.model';

// IRepository
import { IUserRepository } from 'src/sso/domain/irepositories/user/i-user.repository.interface';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

/** UserRepository */
export class UserBaseRepository<M extends User, I extends IUser> extends GenericRepository<M> implements IUserRepository<M, I> {
  relations(): (object: M) => any {
    return (r) => [r.userInfo];
  }

  /** find By Username */
  public async findByUsername(username: string): Promise<M> {
    const qb = this.createQueryBuilder('user');
    qb.select(['user.username', 'user.password', 'user.id']);
    return await qb.where('user.username = :username', { username }).getOne();
  }
}

@Injectable()
export class UserRepository extends UserBaseRepository<User, IUser> implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
