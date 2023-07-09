import * as redis from 'redis';

/**
 * @param M Model Entity
 * @param I Interface Entity
 */
export interface IGenericRedisRepository<E = any> {
  setKey(entity: ISetKeyRedis<E>, opt?: IRepositoryRedisOpt): Promise<E>;
  getKey(key: string): Promise<E>;
  incrKey(key: string, opt?: IRepositoryRedisOpt): Promise<number>;

  setHashKey(entity: IHashRedis<E>, opt?: IRepositoryRedisOpt): Promise<E>;
  getOneHashKey(getHash: IGetHashRedis): Promise<E>;
  getAllHashKey(hash: string): Promise<E>;

  createAndStartTransaction(): Promise<redis.RedisClientType>;
  commitTransaction(query: redis.RedisClientType): Promise<void>;
  rollbackTransaction(query: redis.RedisClientType): Promise<void>;
  releaseTransaction(query: redis.RedisClientType): Promise<void>;
}

export interface IGetHashRedis {
  key: string;
  hash: string;
}

export interface ISetKeyRedis<E = any> {
  key: string;
  value: Partial<E>;
}

export interface IHashRedis<E = any> {
  key: string;
  hash: string;
  value: E;
}

export interface IRepositoryRedisOpt {
  /**
   * flag to indicate if you want that generic repository handle errors
   */
  handleError?: boolean;

  /**
   * Multi, for transaction
   */
  multi?: redis.RedisClientType;
}
