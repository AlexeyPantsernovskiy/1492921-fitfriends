import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserProperty } from '../../swagger/user/user-property';
import { UserLogin } from '../../types/user-login.interface';

export class LoginUserDto implements UserLogin {
  @ApiProperty(UserProperty.Email.Description)
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: UserProperty.Email.Validate.Message })
  public email: string;

  @ApiProperty(UserProperty.Password.Description)
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
