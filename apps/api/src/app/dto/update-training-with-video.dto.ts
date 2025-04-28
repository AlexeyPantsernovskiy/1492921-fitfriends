import { ApiProperty, OmitType } from '@nestjs/swagger';

import { TrainingProperty, UpdateTrainingDto } from '@project/shared-core';
import { IsOptional } from 'class-validator';

export class UpdateTrainingWithVideoDto extends OmitType(UpdateTrainingDto, [
  'image',
  'video',
  'coachId',
]) {
  @ApiProperty({ ...TrainingProperty.VideoFile.Description, required: false })
  @IsOptional()
  public videoFile?: Express.Multer.File;
}
