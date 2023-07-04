// Dependencies
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Model
import { UserEntity } from '../../entities/user/user.entity';
import { IUser, User } from 'src/sso/domain/models/user/user.model';

// IRepository
import { IUserRepository } from 'src/sso/domain/irepositories/user/i-user.repository.interface';

// Interface
import { IRepositoryOpt } from 'src/common/domain/irepositories/i-repository.repository.interface';

// Repository
import { GenericRepository } from 'src/common/infrastructure/repositories/generic.repository';

/** UserRepository */
export class UserBaseRepository<M extends User, I extends IUser> extends GenericRepository<M> implements IUserRepository<M, I> {
  relations(): (object: M) => any {
    return (r) => [r.userInfo];
  }

  /** create Entity */
  public async createEntity(entity: I, opt?: IRepositoryOpt): Promise<M> {
    entity.password = this.hashPassword(entity.password);
    return await super.createEntity(entity, opt);
  }

  /** update Entity */
  public async updateEntity(entity: I, opt?: IRepositoryOpt): Promise<M> {
    entity.password = this.hashPassword(entity.password);
    return await super.updateEntity(entity, opt);
  }

  /** find By Username */
  public async findByUsername(username: string): Promise<M> {
    const qb = this.createQueryBuilder('user');
    qb.select(['user.username', 'user.password', 'user.id']);
    return await qb.where('user.username = :username', { username }).getOne();
  }

  /** hash Password
   * @param password
   * @param saltRounds
   */
  private hashPassword(password: string, saltRounds = 10): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}

@Injectable()
export class UserRepository extends UserBaseRepository<User, IUser> implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
