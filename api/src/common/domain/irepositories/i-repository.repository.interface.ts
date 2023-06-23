import { QueryRunner } from 'typeorm';

import { Search } from 'src/common/application/dto/search.dto';
import { ID } from 'src/common/application/types/types.types';

/**
 * @param M Model Entity
 * @param I Interface Entity
 */
export interface IGenericRepository<E = any, IE = any> {
  listEntities(search?: Search, opt?: IRepositoryOpt): Promise<E[]>;
  listEntitiesAndCount(search?: Search, opt?: IRepositoryOpt): Promise<[E[], number]>;
  findOneEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
  createEntity(entity: IE, opt?: IRepositoryOpt): Promise<E>;
  createEntities(entity: IE[], opt?: IRepositoryOpt): Promise<E[]>;
  updateEntity(entity: IE, opt?: IRepositoryOpt): Promise<E>;
  updateEntities(entity: IE[], opt?: IRepositoryOpt): Promise<E[]>;
  deleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
  softDeleteEntity(id: ID, opt?: IRepositoryOpt): Promise<E>;
  createAndStartTransaction(): Promise<QueryRunner>;
  commitTransaction(query: QueryRunner): Promise<void>;
  rollbackTransaction(query: QueryRunner): Promise<void>;
  releaseTransaction(query: QueryRunner): Promise<void>;
}

export interface IRepositoryOpt<T = any> {
  /**
   * Indicates what relations of entity should be loaded (simplified left join form).
   */
  relations: (keyof T)[];
  /**
   * Specifies what columns should be retrieved.
   */
  select: (keyof T)[];
  /**
   * flag to indicate if you want that generic repository handle errors
   */
  handleError?: boolean;
  /**
   * QueryRunner, for transaction
   */
  queryRunner?: QueryRunner;
}
