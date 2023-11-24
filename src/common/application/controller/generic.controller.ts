import { Search } from '../dto/search.dto';
import { HttpStatus, Logger } from '@nestjs/common';
import { GenericService } from 'src/common/domain/service/generic.service';
import { IJsonResponse, JsonResponse } from '../model/json-response.class';
import { Response } from 'express';
import { IGenericRepository } from 'src/common/domain/irepositories/i-repository.repository.interface';
import { ID } from '../types/types.types';

/**
 * @type C -> Create DTO
 * @type U -> Update DTO
 * @type ME -> Model Entity
 * @type IS -> Interface Service
 */
export class GenericController<C, U, ME, IS extends GenericService<C, U, ME, IGenericRepository<ME, Partial<ME>>>> {
  constructor(private readonly service: IS) {}

  protected logger = new Logger(this.constructor.name);

  public async serviceDetail(id: ID, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.findOne(id);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceFind(search: Search, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.listAndCount(search);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceList(opt: OptionsController): Promise<JsonResponse<ME[]>> {
    const { response } = opt;
    const data = await this.service.list();
    const jsonResponse = new JsonResponse<ME[]>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceCreate(dto: C, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.create(dto);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceCreateArr(dto: C[]): Promise<ME[]> {
    return await this.service.createArr(dto);
  }

  public async serviceUpdate(dto: U, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.update(dto);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceUpdateArr(dto: U[]): Promise<ME[]> {
    return await this.service.updateArr(dto);
  }

  public async serviceDelete(id: ID, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.delete(id);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  public async serviceSoftDelete(id: ID, opt: OptionsController): Promise<JsonResponse<ME>> {
    const { response } = opt;
    const data = await this.service.delete(id);
    const jsonResponse = new JsonResponse<ME>({ ...opt, data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }
}

/** Keys To Omit */
type OmitKeys = Pick<IJsonResponse, 'data'>;
type IJsonResponseOmit = Omit<IJsonResponse, keyof OmitKeys>;

interface OptionsController extends IJsonResponseOmit {
  response: Response;
}
