import { Logger } from '@nestjs/common';
import { Repository, DataSource, EntityTarget, QueryRunner } from 'typeorm';
import { Search } from 'src/common/application/dto/search.dto';
import { IRepositoryOpt, IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { ID } from 'src/common/application/types/types.types';

export class GenericRepository<E> extends Repository<E> implements IGenericRepository {
  constructor(target: EntityTarget<E>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  protected logger = new Logger(this.constructor.name);

  public async listEntities(search?: Search, opt?: IRepositoryOpt): Promise<E[]> {
    const { queryRunner, relations, select, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.find();
  }

  public async listEntitiesAndCount(search?: Search, opt?: IRepositoryOpt): Promise<[E[], number]> {
    const { queryRunner, relations, select, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.findAndCount();
  }

  public async findOneEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, relations, select, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.findOne({ where: { id } as any });
  }

  public async createEntity(entity, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.save(entity);
  }

  public async createEntities(entity: [], opt?: IRepositoryOpt): Promise<E[]> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    throw new Error('Method not implemented.');
  }

  public async updateEntity(entity, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.save(entity);
  }

  public async updateEntities(entity: [], opt?: IRepositoryOpt): Promise<E[]> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return;
  }

  public async deleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    const entity = await this.findOneEntity(id);
    return await repository.remove(entity);
  }

  public async softDeleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    const entity = await this.findOneEntity(id);
    await repository.softDelete(id);
    return entity;
  }

  public async createAndStartTransaction(): Promise<QueryRunner> {
    const transaction = this.manager.connection.createQueryRunner();
    await transaction.connect();
    await transaction.startTransaction();

    return transaction;
  }

  public async commitTransaction(query: QueryRunner): Promise<void> {
    return await query.commitTransaction();
  }

  public async rollbackTransaction(query: QueryRunner): Promise<void> {
    return await query.rollbackTransaction();
  }

  public async releaseTransaction(query: QueryRunner): Promise<void> {
    return await query.release();
  }

  /** get queryRunner repository or a simple repository */
  private getSimpleOrTransaction(query?: QueryRunner) {
    return query ? query.manager.getRepository(this.target) : this.manager.getRepository(this.target);
  }
}
