import { ApiProperty, OmitType } from '@nestjs/swagger';

import {
  FillCoachQuestionnaireDto,
  QuestionnaireUserProperty,
} from '@project/shared-core';

export class FillCoachQuestionnaireWithFileDto extends OmitType(
  FillCoachQuestionnaireDto,
  ['certificates']
) {
  @ApiProperty(QuestionnaireUserProperty.CertificateFile.Description)
  public certificateFile: Express.Multer.File;
}
