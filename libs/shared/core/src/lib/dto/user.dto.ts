//import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { UserProperty } from '../swagger/user/user-property';

import { Transform } from 'class-transformer';
import { UserRegister } from '../types/user-register.interface';
import { LOCATIONS, SEX } from '../constants/data';
import { Role, UserRole } from '../types/user-role.enum';
import { Sex } from '../types/sex.enum';
import { UserLogin } from '../types/user-login.interface';

export class LoginUserDto implements UserLogin {
  //@ApiProperty(UserProperty.Email.Description)
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: UserProperty.Email.Validate.Message })
  public email: string;

  //@ApiProperty(UserProperty.Password.Description)
  @IsString()
  @IsNotEmpty()
  @Length(
    UserProperty.Password.Validate.MinLength,
    UserProperty.Password.Validate.MaxLength,
    {
      message: UserProperty.Password.Validate.Message,
    }
  )
  public password: string;
}

export class CreateUserDto extends LoginUserDto implements UserRegister {
  //@ApiProperty(UserProperty.Name.Description)
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

  //@ApiProperty(UserProperty.Avatar.Description)
  @IsString()
  @IsOptional()
  public avatar?: string;

  //@ApiProperty(UserProperty.Sex.Description)
  @IsEnum(SEX, {
    message: UserProperty.Sex.Validate.Message,
  })
  public sex: Sex;

  //@ApiProperty(UserProperty.Birthday.Description)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  public birthDate?: Date;

  //@ApiProperty(UserProperty.Description.Description)
  @IsString()
  @IsOptional()
  @Length(
    UserProperty.Description.Validate.MinLength,
    UserProperty.Description.Validate.MaxLength,
    {
      message: UserProperty.Description.Validate.Message,
    }
  )
  public description?: string;

  //@ApiProperty(UserProperty.Location.Description)
  @IsEnum(LOCATIONS, {
    message: UserProperty.Location.Validate.Message,
  })
  public location: string;

  //@ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo1: string;

  //@ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo2: string;

  //@ApiProperty(UserProperty.Role.Description)
  @IsEnum(Object.values(Role), {
    message: UserProperty.Role.Validate.Message,
  })
  public role: UserRole;
}
