import { Logger } from '@nestjs/common';
import { IGenericRepository } from '../irepositories/i-repository.repository.interface';
import { IGenericService } from '../iservice/i-generic.service.interface';
import { Search } from 'src/common/application/dto/search.dto';
import { ID } from 'src/common/application/types/types.types';

export class GenericService<C, U, E, IR extends IGenericRepository<E, Partial<E>>> implements IGenericService<C, U, E> {
  constructor(public readonly repository: IR) {}
  protected logger = new Logger(this.constructor.name);

  public async list(search?: Search): Promise<E[]> {
    return await this.repository.listEntities(search);
  }

  public async listAndCount(search?: Search): Promise<[E[], number]> {
    return await this.repository.listEntitiesAndCount(search);
  }

  public async findOne(id: ID): Promise<E> {
    return await this.repository.findOneEntity(id);
  }

  public async create(dto: C): Promise<E> {
    return await this.repository.createEntity(dto as any);
  }

  public async createArr(dto: C[]): Promise<E[]> {
    return await this.repository.createEntities(dto as any);
  }

  public async update(dto: U): Promise<E> {
    return await this.repository.updateEntity(dto as any);
  }

  public async updateArr(dto: U[]): Promise<E[]> {
    return await this.repository.updateEntities(dto as any);
  }

  public async delete(id: ID): Promise<E> {
    return await this.repository.deleteEntity(id);
  }

  public async softDelete(id: ID): Promise<E> {
    return await this.repository.softDeleteEntity(id);
  }
}
