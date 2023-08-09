import { Controller, Get, Query } from '@nestjs/common';
import { WrongLocationTypeException } from 'src/shared';

import { BuildingsService } from './buildings.service';
import { GetBuildingDto } from './dto';

@Controller('v1/structure')
export class BuildingsController {
  constructor(private readonly buildingServcie: BuildingsService) {}

  @Get()
  getBuilding(@Query() queryParams: GetBuildingDto) {
    if (queryParams.locationType !== 'building') {
      throw new WrongLocationTypeException('Wrong Location Type');
    }

    return this.buildingServcie.getBuilding(queryParams.projectId);
  }
}
