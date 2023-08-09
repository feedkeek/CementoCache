import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitApplicationConfig } from './config';
import { CustomRedisModule } from './redis/redis.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ChecklistsModule } from './checklists/checklists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [InitApplicationConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379',
      },
    }),
    CustomRedisModule,
    BuildingsModule,
    ChecklistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
