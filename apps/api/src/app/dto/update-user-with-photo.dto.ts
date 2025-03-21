import { ApiProperty, OmitType } from '@nestjs/swagger';

import { UpdateUserDto, UserProperty } from '@project/shared-core';

export class UpdateUserWithPhotoDto extends OmitType(UpdateUserDto, [
  'userId',
  'avatar',
]) {
  @ApiProperty(UserProperty.AvatarFile.Description)
  public avatarFile: Express.Multer.File;
}
