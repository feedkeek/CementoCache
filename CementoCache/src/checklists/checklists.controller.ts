import { Controller, Get, Query } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { GetChecklistDto } from './dto';

@Controller('v2/Checklists')
export class ChecklistsController {
  constructor(private readonly checklistService: ChecklistsService) {}

  @Get()
  getChecklist(@Query() queryParams: GetChecklistDto) {
    return this.checklistService.getChecklists(queryParams.projectId);
  }
}
