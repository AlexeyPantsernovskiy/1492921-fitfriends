import { ApiProperty, OmitType } from '@nestjs/swagger';

import { CreateTrainingDto, TrainingProperty } from '@project/shared-core';

export class CreateTrainingWithVideoDto extends OmitType(CreateTrainingDto, [
  'image',
  'video',
  'coachId',
  'isSpecialOffer',
]) {
  @ApiProperty(TrainingProperty.VideoFile.Description)
  public videoFile: Express.Multer.File;
}
