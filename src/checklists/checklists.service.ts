import { Injectable } from '@nestjs/common';
import { GetChecklistDto } from './dto';
import { ChecklistType } from './types';
import { RedisService } from 'src/redis/redis.service';
import { DataApiService } from 'src/api/data-api/data-api.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigType } from 'src/config';
import { generateChecklistsKey } from 'src/utils';

@Injectable()
export class ChecklistsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly dataApiService: DataApiService,
    private readonly configService: ConfigService<ApplicationConfigType>,
  ) {}

  async getChecklists(
    id: GetChecklistDto['projectId'],
  ): Promise<ChecklistType> {
    const data = await this.redisService.get(id);
    if (!data) {
      const matchingChecklist = this.dataApiService.getCheckilst(id);
      await this.redisService.put(
        generateChecklistsKey(id),
        matchingChecklist,
        this.configService.get('CHECKLISTS_TTL'),
      );
      return matchingChecklist;
    }
    return data;
  }
}
