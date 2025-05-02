import { ApiProperty } from '@nestjs/swagger';

import { QuestionnaireUserProperty } from '@project/shared-core';

export class LoadFileCertificateDto {
  @ApiProperty(QuestionnaireUserProperty.CertificateFile.Description)
  public certificateFile: Express.Multer.File;
}
