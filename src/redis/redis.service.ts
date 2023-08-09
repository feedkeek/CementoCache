import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async put(key: string, data: any, ttl: number) {
    await this.redis.set(key, data, 'EX', ttl);
  }

  async get(key: string): Promise<any> {
    return this.redis.get(key);
  }
}
