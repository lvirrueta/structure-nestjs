import { Search } from 'src/common/application/dto/search.dto';
import { ID } from 'src/common/application/types/types.types';

/**
 * @param ME Model Entity
 * @param C Create
 * @param U Update
 */
export interface IGenericService<C = any, U = any, ME = any> {
  list(): Promise<ME[]>;
  listAndCount(search: Search): Promise<[ME[], number]>;
  findOne(id: ID): Promise<ME>;
  create(dto: C): Promise<ME>;
  createArr(dto: C[]): Promise<ME[]>;
  update(dto: U): Promise<ME>;
  updateArr(dto: U[]): Promise<ME[]>;
  delete(id: ID): Promise<ME>;
  softDelete(id: ID): Promise<ME>;
}
