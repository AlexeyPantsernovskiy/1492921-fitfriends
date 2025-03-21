import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

import { UserProperty } from '../../swagger/user/user-property';
import { Transform } from 'class-transformer';
import { UserRegister } from '../../types/user-register.interface';
import { LOCATIONS, SEX } from '../../constants/data';
import { UserRole } from '../../types/user-role.enum';
import { Sex } from '../../types/sex.enum';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto implements UserRegister {
  @ApiProperty(UserProperty.Name.Description)
  @IsString()
  @IsNotEmpty()
  @Length(
    UserProperty.Name.Validate.MinLength,
    UserProperty.Name.Validate.MaxLength,
    {
      message: UserProperty.Name.Validate.Message,
    }
  )
  public name: string;

  @ApiProperty(UserProperty.Avatar.Description)
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty(UserProperty.Sex.Description)
  @IsEnum(SEX, {
    message: UserProperty.Sex.Validate.Message,
  })
  public sex: Sex;

  @ApiProperty(UserProperty.Birthday.Description)
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @IsOptional()
  public birthday?: Date;

  @ApiProperty(UserProperty.Description.Description)
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.description !== '')
  @Length(
    UserProperty.Description.Validate.MinLength,
    UserProperty.Description.Validate.MaxLength,
    {
      message: UserProperty.Description.Validate.Message,
    }
  )
  public description?: string;

  @ApiProperty(UserProperty.Location.Description)
  @IsEnum(LOCATIONS, {
    message: UserProperty.Location.Validate.Message,
  })
  public location: string;

  @ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo1: string;

  @ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo2: string;

  @ApiProperty(UserProperty.Role.Description)
  @IsEnum(Object.values(UserRole), {
    message: UserProperty.Role.Validate.Message,
  })
  public role: UserRole;
}
