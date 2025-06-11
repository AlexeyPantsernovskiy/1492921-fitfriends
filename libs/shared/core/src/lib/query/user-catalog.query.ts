import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { UserProperty } from '../swagger/user/user-property';
import { UserRole } from '../types/user-role.enum';
import { LEVELS, LOCATIONS, SPECIALIZATIONS } from '../constants/data';
import { Specialization } from '../types/specialization.enum';
import { QuestionnaireUserProperty } from '../swagger/user/questionnaire-user-property';
import { Level } from '../types/level.enum';
import { PaginationQuery } from './pagination.query';

export class UserCatalogQuery extends PaginationQuery {
  @ApiProperty({
    ...UserProperty.Location.Description,
    isArray: true,
    required: false,
    example: [LOCATIONS[0], LOCATIONS[2]],
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsIn(LOCATIONS, { each: true })
  @IsOptional()
  public locations?: string[];

  @ApiProperty({
    ...QuestionnaireUserProperty.Specialization.Description,
    required: false,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsIn(SPECIALIZATIONS, { each: true })
  @IsOptional()
  public specializations?: Specialization[];

  @ApiProperty({
    ...QuestionnaireUserProperty.Level.Description,
    required: false,
  })
  @IsEnum(LEVELS, {
    message: QuestionnaireUserProperty.Level.Validate.Message,
  })
  @IsOptional()
  level?: Level;

  @ApiProperty({
    ...UserProperty.Role.Description,
    required: false,
  })
  @ValidateIf((o) => o.role)
  @IsIn(Object.values(UserRole))
  @IsOptional()
  public role?: UserRole;

  @ApiProperty({
    ...QuestionnaireUserProperty.IsReadyToTrain.Description,
    required: false,
  })
  @ValidateIf((o) => o.isReadyToTrain)
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  public isReadyToTrain?: boolean;
}
