import { Module } from '@nestjs/common';

import { DataApiService } from './data-api.service';

@Module({
  providers: [DataApiService],
  exports: [DataApiService],
})
export class DataApiModule {}
