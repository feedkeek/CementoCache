import { Injectable } from '@nestjs/common';

import { GetBuildingDto } from 'src/buildings/dto';
import { Building } from 'src/buildings/types';
import { ChecklistType } from 'src/checklists/types';

import { buildings as BUILDINGS } from 'src/__mocks__/buildings.json';
import { checklists as CHECKLISTS } from 'src/__mocks__/checklists.json';

@Injectable()
export class DataApiService {
  getBuilding(id: GetBuildingDto['projectId']): Building {
    const building = BUILDINGS.find((building) => building.id === id);
    if (!building) {
      throw new Error(`No matching buiding for id=${id}`);
    }
    return building;
  }

  getCheckilst(id: string): ChecklistType {
    const checklist = CHECKLISTS.find((checklist) => checklist.id === id);
    if (!checklist) {
      throw new Error(`No matching checklist for id=${id}`);
    }
    return checklist;
  }
}
