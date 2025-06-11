import { Transform } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { OmitType, ApiProperty } from '@nestjs/swagger';

import { TrainingSortDefault } from '../constants/training.constant';
import { CommonProperty } from '../swagger/common-property';
import { TrainingProperty } from '../swagger/training/training-property';
import { SortDirection } from '../types/sort-direction.enum';
import { SortType } from '../types/sort-type.enum';
import { UserProperty } from '../swagger/user/user-property';
import { TrainingOrderProperty } from '../swagger/training/training-order-property';
import { UserRole } from '../types/user-role.enum';
import { PaginationQuery } from './pagination.query';

export class TrainingOrderQuery extends PaginationQuery {
  @ApiProperty(CommonProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = TrainingSortDefault.Direction;

  @ApiProperty(TrainingProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = TrainingSortDefault.Type;

  @ApiProperty(TrainingOrderProperty.OnlyActive.Description)
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  public activeOnly?: boolean;

  @ApiProperty({ ...UserProperty.Id.Description, required: false })
  @IsString()
  @ValidateIf((o) => o.userId !== '')
  @IsMongoId({ message: UserProperty.Id.Validate.Message })
  @IsOptional()
  public userId?: string;

  @ApiProperty({ ...UserProperty.Role.Description, required: false })
  @ValidateIf((o) => o.role !== '')
  @IsIn(Object.values(UserRole))
  public role?: UserRole;

  @ApiProperty({ ...TrainingProperty.Id.Description, required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  public trainingId?: number;
}

export class TrainingMyOrderQuery extends OmitType(TrainingOrderQuery, [
  'role',
  'userId',
  'trainingId',
]) {}
