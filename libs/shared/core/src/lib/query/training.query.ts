import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

import { CommonProperty } from '../swagger/common-property';
import { TrainingSortDefault } from '../constants/training.constant';
import { TrainingProperty } from '../swagger/training/training-property';
import { SortDirection } from '../types/sort-direction.enum';
import { SortType } from '../types/sort-type.enum';
import { DURATIONS, SPECIALIZATIONS } from '../constants/data';
import { Specialization } from '../types/specialization.enum';
import { Duration } from '../types/duration.enum';

export class TrainingQuery {
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  public limit?: number;

  @ApiProperty(TrainingProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = TrainingSortDefault.Direction;

  @ApiProperty(TrainingProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = TrainingSortDefault.Type;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public page?: number;

  @ApiProperty(TrainingProperty.MinPrice.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @IsOptional()
  public minPrice?: number;

  @ApiProperty(TrainingProperty.MaxPrice.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @IsOptional()
  public maxPrice?: number;

  @ApiProperty(TrainingProperty.MinCalories.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(TrainingProperty.MinCalories.Validate.Min)
  @Max(TrainingProperty.MinCalories.Validate.Max)
  @IsOptional()
  public minCalories?: number;

  @ApiProperty(TrainingProperty.MaxCalories.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(TrainingProperty.MaxCalories.Validate.Min)
  @Max(TrainingProperty.MaxCalories.Validate.Max)
  @IsOptional()
  public maxCalories?: number;

  @ApiProperty(TrainingProperty.MinRating.Description)
  @Transform(({ value }) => parseFloat(value))
  @Min(TrainingProperty.MinRating.Validate.Min)
  @Max(TrainingProperty.MinRating.Validate.Max)
  @IsOptional()
  public minRating?: number;

  @ApiProperty(TrainingProperty.MaxRating.Description)
  @Transform(({ value }) => parseFloat(value))
  @Min(TrainingProperty.MaxRating.Validate.Min)
  @Max(TrainingProperty.MaxRating.Validate.Max)
  @IsOptional()
  public maxRating?: number;

  @ApiProperty(TrainingProperty.Specializations.Description)
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsIn(SPECIALIZATIONS, { each: true })
  @IsOptional()
  public specializations?: Specialization[];

  @ApiProperty(TrainingProperty.Durations.Description)
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsIn(DURATIONS, { each: true })
  @IsOptional()
  public durations?: Duration[];

  @ApiProperty({ ...TrainingProperty.CoachId.Description, required: false })
  @IsString()
  @ValidateIf((o) => o.coachId !== '')
  @IsMongoId()
  @IsOptional()
  public coachId?: string;
}
