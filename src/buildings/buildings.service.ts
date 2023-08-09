import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from 'src/redis/redis.service';
import { type GetBuildingDto } from './dto';
import { DataApiService } from 'src/api/data-api/data-api.service';
import { generateBuildingsKey } from 'src/utils';
import { ApplicationConfigType } from 'src/config';

@Injectable()
export class BuildingsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly dataApiService: DataApiService,
    private readonly configService: ConfigService<ApplicationConfigType>,
  ) {}

  async getBuilding(id: GetBuildingDto['projectId']) {
    const data = await this.redisService.get(id);
    if (!data) {
      const matchingBuilding = this.dataApiService.getBuilding(id);
      await this.redisService.put(
        generateBuildingsKey(id),
        matchingBuilding,
        this.configService.get('BUILDINGS_TTL'),
      );
      return matchingBuilding;
    }
    return data;
  }
}
