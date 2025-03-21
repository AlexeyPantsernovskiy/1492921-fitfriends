import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '@project/shared-core';

export class UpdateUserAvatarDto {
  @ApiProperty(UserProperty.AvatarFile.Description)
  public avatarFile: Express.Multer.File;
}
