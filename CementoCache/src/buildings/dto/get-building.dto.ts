import { IsString } from 'class-validator';

export class GetBuildingDto {
  @IsString()
  projectId: string;

  @IsString()
  locationType: string;
}
