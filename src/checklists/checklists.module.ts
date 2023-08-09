import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataApiModule } from 'src/api/data-api/data-api.module';
import { CustomRedisModule } from 'src/redis/redis.module';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';

@Module({
  providers: [ChecklistsService],
  controllers: [ChecklistsController],
  imports: [CustomRedisModule, DataApiModule, ConfigModule],
})
export class ChecklistsModule {}
