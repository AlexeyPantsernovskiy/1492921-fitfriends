import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto, UserProperty } from '@project/shared-core';

export class CreateUserWithPhotoDto extends OmitType(CreateUserDto, [
  'avatar',
  'photo1',
  'photo2',
]) {
  @ApiProperty(UserProperty.AvatarFile.Description)
  public avatarFile: Express.Multer.File;
}
