// Dependencies
import * as redis from 'redis';
import { Logger } from '@nestjs/common';

// Utils
import { ThrowError } from 'src/utils/throw-server-error';

// Interface
import {
  IHashRedis,
  ISetKeyRedis,
  IGetHashRedis,
  IRepositoryRedisOpt,
  IGenericRedisRepository,
} from 'src/common/domain/irepositories/i-redis-repository.repository.interface';

// Constants
import { Errors } from 'src/common/application/errors/errors.constants';

export abstract class RedisGenericRepository<E = any> implements IGenericRedisRepository {
  protected logger = new Logger(this.constructor.name);

  /** setKey */
  public async setKey(entity: ISetKeyRedis<E>, opt?: IRepositoryRedisOpt): Promise<E> {
    const { key, value } = entity;
    const { multi } = { ...opt };

    const client = await this.getTransactionOrSimple(multi);
    await client.set(key, JSON.stringify(value));

    await this.closeConnection({ client, multi });
    return value as E;
  }

  /** getKey */
  public async getKey(key: string): Promise<E> {
    const client = await this.connect2Redis();
    const entity = await client.get(key);
    await client.quit();
    return JSON.parse(entity);
  }

  /** incrKey */
  public async incrKey(key: string, opt?: IRepositoryRedisOpt): Promise<number> {
    const { multi } = opt;

    const client = await this.getTransactionOrSimple(multi);
    const value = await client.incr(key);

    await this.closeConnection({ client, multi });
    return value;
  }

  /** setHashKey */
  public async setHashKey(entity: IHashRedis<E>, opt?: IRepositoryRedisOpt): Promise<E> {
    return;
  }

  /** getOneHashKey */
  public async getOneHashKey(getHash: IGetHashRedis): Promise<E> {
    return;
  }

  /** getAllHashKey */
  public async getAllHashKey(hash: string): Promise<E> {
    return;
  }

  /** createAndStartTransaction */
  public async createAndStartTransaction(): Promise<redis.RedisClientType> {
    const client: redis.RedisClientType = await this.connect2Redis();
    await client.multi();
    return client;
  }

  /** commitTransaction */
  public async commitTransaction(client): Promise<void> {
    await client.exec();
  }

  /** rollbackTransaction */
  public async rollbackTransaction(client: redis.RedisClientType): Promise<void> {
    await client.discard();
  }

  /** releaseTransaction */
  public async releaseTransaction(client: redis.RedisClientType): Promise<void> {
    await client.quit();
  }

  /** getTransactionOrSimple */
  private async getTransactionOrSimple(multi?: redis.RedisClientType): Promise<redis.RedisClientType> {
    return multi ? multi : this.connect2Redis();
  }

  /** closeConnection */
  private async closeConnection(connections: ICloseConnection): Promise<void> {
    const { client, multi } = connections;
    if (!multi && client) {
      await client.quit();
    }
  }

  /** get queryRunner repository or a simple repository */
  public async connect2Redis(opt?: IOptionConnection): Promise<redis.RedisClientType> {
    const hostEnv = process.env.REDIS_HOST;
    const dbEnv = process.env.REDIS_DB;
    const userEnv = process.env.REDIS_USER;
    const passwordEnv = process.env.REDIS_PASSWORD;
    const portEnv = process.env.REDIS_PORT;
    const protocolEnv = process.env.REDIS_PROTOCOL;

    const { db = dbEnv } = { ...opt };

    const client: redis.RedisClientType = redis.createClient({
      url: `${protocolEnv}://${userEnv}:${passwordEnv}@${hostEnv}:${portEnv}/${db}`,
    });

    await client.connect();
    if (client.isOpen) {
      return client;
    } else {
      ThrowError.httpException(Errors.RedisGenericRepository.NoConnection);
    }
  }
}

interface IOptionConnection {
  db: number;
}

interface ICloseConnection {
  client: redis.RedisClientType;
  multi: redis.RedisClientType;
}
