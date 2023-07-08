/* eslint-disable @typescript-eslint/no-empty-interface */
import { QueryRunner } from 'typeorm';

import { Search } from 'src/common/application/dto/search.dto';
import { ID } from 'src/common/application/types/types.types';

interface IMethodsGenericRepository<E = any, IE = any> {
  listEntities(search?: Search, opt?: IRepositoryOpt): Promise<E[]>;
  listEntitiesAndCount(search?: Search, opt?: IRepositoryOpt): Promise<[E[], number]>;
  findOneEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
  createEntity(entity: IE, opt?: IRepositoryOpt): Promise<E>;
  createEntities(entity: IE[], opt?: IRepositoryOpt): Promise<E[]>;
  updateEntity(entity: IE, opt?: IRepositoryOpt): Promise<E>;
  updateEntities(entity: IE[], opt?: IRepositoryOpt): Promise<E[]>;
  deleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
  softDeleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
}

interface ITransactionGenericRepository {
  createAndStartTransaction(): Promise<QueryRunner>;
  commitTransaction(query: QueryRunner): Promise<void>;
  rollbackTransaction(query: QueryRunner): Promise<void>;
  releaseTransaction(query: QueryRunner): Promise<void>;
}

/**
 * Interface of generic repository with transactions
 * @param M Model Entity
 * @param I Interface Entity
 */
export interface IGenericRepository<E = any, IE = any> extends IMethodsGenericRepository<E, IE>, ITransactionGenericRepository {}

/**
 * Interface of generic repository without transactions
 * @param M Model Entity
 * @param I Interface Entity
 */
export interface IGenericRepositoryNTr<E = any, IE = any> extends IMethodsGenericRepository<E, IE> {}

export interface IRepositoryOpt<T = any> {
  /**
   * Indicates what relations of entity should be loaded (simplified left join form).
   */
  relations?: (object: T) => any;
  /**
   * Specifies what columns should be retrieved.
   */
  select?: (keyof T)[];
  /**
   * flag to indicate if you want that generic repository handle errors
   */
  handleError?: boolean;
  /**
   * QueryRunner, for transaction
   */
  queryRunner?: QueryRunner;
}
