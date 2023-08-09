import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataApiModule } from 'src/api/data-api/data-api.module';
import { CustomRedisModule } from 'src/redis/redis.module';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController],
  imports: [CustomRedisModule, DataApiModule, ConfigModule],
})
export class BuildingsModule {}
