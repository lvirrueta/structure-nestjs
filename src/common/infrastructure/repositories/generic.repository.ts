// Dependencies
import { Logger } from '@nestjs/common';
import { Repository, DataSource, EntityTarget, QueryRunner, SelectQueryBuilder } from 'typeorm';

// Utils
import { ThrowError } from 'src/utils/throw-server-error';

// Interface
import { ID } from 'src/common/application/types/types.types';
import { Search } from 'src/common/application/dto/search.dto';
import { IRepositoryOpt, IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';

// Constants
import { Errors } from 'src/common/application/errors/errors.constants';

export abstract class GenericRepository<E> extends Repository<E> implements IGenericRepository {
  constructor(public target: EntityTarget<E>, public dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  abstract relations(): (object: E) => any;

  protected logger = new Logger(this.constructor.name);

  /** list Entities  */
  public async listEntities(search?: Search, opt?: IRepositoryOpt<E>): Promise<E[]> {
    const { queryRunner, relations = this.relations(), select } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    let qb = repository.createQueryBuilder('alias');
    qb = this.qbBuilderRelations(relations, qb);
    return await qb.getMany();
  }

  /** list Entities And Count */
  public async listEntitiesAndCount(search?: Search, opt?: IRepositoryOpt): Promise<[E[], number]> {
    const { queryRunner, relations, select, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.findAndCount();
  }

  /** find One Entity */
  public async findOneEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, relations, select, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return await repository.findOne({ where: { id } as any });
  }

  /** create One Entity */
  public async createEntity(entity, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError = true } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    try {
      return await repository.save(entity);
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      console.log(error);
      throw error;
    }
  }

  /** create an array of entities */
  public async createEntities(entity: [], opt?: IRepositoryOpt): Promise<E[]> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    throw new Error('Method not implemented.');
  }

  /** update entity */
  public async updateEntity(entity, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    const entityF = await repository.findOne({ where: { id: entity['id'] } as any });
    if (!entityF) ThrowError.httpException(Errors.GenericRepository.EntityNotFound, [entity['id']]);

    try {
      return await repository.save(entity);
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      console.log(error);
      throw error;
    }
  }

  /** update entities */
  public async updateEntities(entity: [], opt?: IRepositoryOpt): Promise<E[]> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    return;
  }

  /** delete entity */
  public async deleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    const entity = await repository.findOne({ where: { id } as any });
    if (!entity) ThrowError.httpException(Errors.GenericRepository.EntityNotFound, [entity['id']]);

    try {
      return await repository.remove(entity);
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      console.log(error);
      throw error;
    }
  }

  /** soft delete entity */
  public async softDeleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E> {
    const { queryRunner, handleError } = { ...opt };
    const repository = this.getSimpleOrTransaction(queryRunner);

    const entity = await repository.findOne({ where: { id } as any });
    if (!entity) ThrowError.httpException(Errors.GenericRepository.EntityNotFound, [entity['id']]);

    try {
      await repository.softDelete(id);
      return entity;
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      console.log(error);
      throw error;
    }
  }

  /** create and start transaction */
  public async createAndStartTransaction(): Promise<QueryRunner> {
    const transaction = this.dataSource.createQueryRunner();
    await transaction.connect();
    await transaction.startTransaction();

    return transaction;
  }

  /** commit transaction */
  public async commitTransaction(query: QueryRunner): Promise<void> {
    return await query.commitTransaction();
  }

  /** rollback transaction */
  public async rollbackTransaction(query: QueryRunner): Promise<void> {
    return await query.rollbackTransaction();
  }

  /** release transaction */
  public async releaseTransaction(query: QueryRunner): Promise<void> {
    return await query.release();
  }

  /** create a query builder relations */
  protected qbBuilderRelations(relationsObj: (object: E) => any, qb: SelectQueryBuilder<E>): SelectQueryBuilder<E> {
    const alias = qb.alias;
    const relationsSet = new Set<string>();
    const relations = relationsObj.toString().split('=>')[1].replace(/\s/g, '').replace('[', '').replace(']', '');

    if (relations === '') return qb;

    relations.split(',').forEach((relationAlias) => {
      const relation = relationAlias.split('.');
      if (relation.length > 2) {
        for (let i = 0; i < relation.length - 1; i++) {
          const aliasR = i === 0 ? alias : relation[i];
          relationsSet.add(`${aliasR}.${relation[i + 1]}`);
        }
      } else {
        relationsSet.add(`${alias}.${relation[1]}`);
      }
    });

    const relationsArr = Array.from(relationsSet);
    relationsArr.forEach((r) => {
      const [rel, ali] = r.split('.');
      qb.leftJoinAndSelect(`${rel}.${ali}`, ali);
    });

    return qb;
  }

  /** get queryRunner repository or a simple repository */
  private getSimpleOrTransaction(query?: QueryRunner) {
    return query ? query.manager.getRepository(this.target) : this.dataSource.getRepository(this.target);
  }

  /** Catch Exceptions */
  private catchExceptionsGeneric(error): void {
    const code = error['code'];
    const detail = error['detail'] as string;
    const value = (detail?.split('=')[1] || '')?.match(/\(([^)]+)\)/);
    switch (code) {
      case '23503':
        ThrowError.httpException(Errors.GenericRepository.ConstraintError, [value[1]]);

      case '23505':
        ThrowError.httpException(Errors.GenericRepository.UniqueCodeError, [value[1]]);

      case '23502':
        ThrowError.httpException(Errors.GenericRepository.NotNullValues);

      default:
        break;
    }
  }
}
