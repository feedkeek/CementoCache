import { IsString } from 'class-validator';

export class GetChecklistDto {
  @IsString()
  projectId: string;
}
