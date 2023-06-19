import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository, Brackets, SelectQueryBuilder, FindOneOptions, DataSource, EntityTarget } from 'typeorm';
import { Operator, Search } from 'src/common/application/dto/search.dto';

export abstract class GenericRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  protected logger = new Logger(this.constructor.name);

  /** get one entity */
  async getEntity(id, findOptions?: FindOneOptions<T>): Promise<T> {
    const type = this.create();
    let query = this.createQueryBuilder('generic');
    query = this.queryBuilderRelations(findOptions, query);
    query.where(`generic.id = :id`, { id });
    const entity = await query.getOne();
    if (!entity) {
      throw new NotFoundException(`Entity ${type.constructor.name} with id: ${id} not found`);
    }
    return entity;
  }

  /** get the raw query by pagination */
  getQueryPagination(search: Search, queryBuilder: SelectQueryBuilder<T>, options?: FindOneOptions): SelectQueryBuilder<T> {
    if (options) {
      queryBuilder = this.queryBuilderRelations(options, queryBuilder);
    }
    const filters = search.filters;
    if (filters) {
      queryBuilder = this.queryBuilderPagination(search, queryBuilder);
    }
    return queryBuilder;
  }

  /** Get entities by pagination */
  async getEntities(query: Search, paginationOption?: PaginationOptions): Promise<[T[], number]> {
    let queryBuilder = this.createQueryBuilder('generic');
    if (paginationOption) {
      queryBuilder = this.queryBuilderRelations(paginationOption, queryBuilder);
    }
    const filters = query.filters;
    if (filters) {
      queryBuilder = this.queryBuilderPagination(query, queryBuilder);
    }
    try {
      if (paginationOption?.skipPagination) {
        const result = await queryBuilder.getMany();
        return [result, null];
      } else {
        return await queryBuilder.getManyAndCount();
      }
    } catch (error) {
      this.logger.error(error);
      if (error['code'] == 42703) {
        throw new NotFoundException(`column not found`);
      }
      throw new InternalServerErrorException('Pagination error');
    }
  }

  /** create entity */
  async createEntity(body, handleError = true): Promise<T> {
    try {
      return await this.save(body);
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      throw error;
    }
  }

  /** update entity */
  async updateEntity(body, handleError = true): Promise<T> {
    const id = body.id;
    const entity = await this.getEntity(id);
    const updatedEntity = Object.assign(entity, body);
    try {
      return await this.save(updatedEntity);
    } catch (error) {
      if (!handleError) throw error;
      this.catchExceptionsGeneric(error);
      throw error;
    }
  }

  /** delete entity */
  async deleteEntity(id: number): Promise<T> {
    const result = await this.getEntity(id);
    return await this.remove(result);
  }

  /** apply a soft delete to entity */
  async softDeleteEntity(id: number): Promise<T> {
    const entity = await this.getEntity(id);
    await this.softDelete(id);
    return entity;
  }

  /** Create a query builder relations
   * @param relations - string array of relations
   * @param queryBuilder - query builder from pagination
   * @returns a query builder of relations
   */
  public queryBuilderRelations(findOptions: PaginationOptions, queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    const relations = findOptions?.relations as string[];
    const alias = queryBuilder.alias;
    if (relations) {
      relations.forEach((relation) => {
        if (relation.includes('.')) {
          const nestedRelations = relation.split('.');
          for (let i = 0; i < nestedRelations.length; i++) {
            const nestedRelation = nestedRelations[i];
            if (i === 0) {
              queryBuilder.leftJoinAndSelect(`${alias}.${nestedRelation}`, `${nestedRelation}`);
            } else if (i > 0) {
              const relationBefore = nestedRelations[i - 1];
              queryBuilder.leftJoinAndSelect(`${relationBefore}.${nestedRelation}`, `${nestedRelation}`);
            }
          }
        } else {
          queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, `${relation}`);
        }
      });
    }
    return queryBuilder;
  }

  /** Create a query builder pagination
   * @param {Search} paginationQuery
   * @returns a query builder pagination
   */
  private queryBuilderPagination(paginationQuery: Search, queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    const { offset, limit, filters } = paginationQuery;
    const alias = queryBuilder.alias;
    queryBuilder.skip(offset - 1);
    if (limit) queryBuilder.take(limit);
    filters.forEach((filter) => {
      const values = filter.value;
      const keys = filter.key;
      const operator = filter.operator;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          keys.forEach((key) => {
            values.forEach((value) => {
              switch (operator) {
                case Operator.STARTS_WITH:
                  if (key.includes('.')) {
                    const [alias, newKey] = key.split('.');
                    qb.orWhere(`${alias}.${newKey} ::text ILIKE '${value}%'`);
                  } else {
                    qb.orWhere(`${alias}.${key} ::text ILIKE '${value}%'`);
                  }
                  break;

                case Operator.ENDS_WITH:
                  if (key.includes('.')) {
                    const [alias, newKey] = key.split('.');
                    qb.orWhere(`${alias}.${newKey} ::text ILIKE '%${value}'`);
                  } else {
                    qb.orWhere(`${alias}.${key} ::text ILIKE '%${value}'`);
                  }
                  break;

                case Operator.CONTAINS:
                  if (key.includes('.')) {
                    const [alias, newKey] = key.split('.');
                    qb.orWhere(`${alias}.${newKey} ::text ILIKE '%${value}%'`);
                  } else {
                    qb.orWhere(`${alias}.${key} ::text ILIKE '%${value}%'`);
                  }
                  break;

                default:
                  if (key.includes('.')) {
                    const [alias, newKey] = key.split('.');
                    qb.orWhere(`${alias}.${newKey} ::text ${operator} '${value}'`);
                  } else {
                    qb.orWhere(`${alias}.${key} ::text ${operator} '${value}'`);
                  }
                  break;
              }
            });
          });
        }),
      );
    });

    if (!paginationQuery.orderBy) {
      return queryBuilder;
    }
    const orderKey = paginationQuery?.orderBy.key;
    const orderBy = paginationQuery?.orderBy.orderBy;
    if (orderKey.includes('.')) {
      const [alias, newOrderKey] = orderKey.split('.');
      return queryBuilder.orderBy(`${alias}.${newOrderKey}`, orderBy);
    } else {
      return queryBuilder.orderBy(`generic.${orderKey}`, orderBy);
    }
  }

  /** Catch Exceptions */
  private catchExceptionsGeneric(error): void {
    if (error['code'] == 23503) {
      const detail = error['detail'] as string;
      const value = (detail.split('=')[1] || '').match(/\(([^)]+)\)/);
      throw new NotFoundException(`entity ${value[1]} not found`);
    }
  }
}

export interface PaginationOptions extends FindOneOptions {
  skipPagination?: boolean;
}
