import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TrainingRdo } from './training.rdo';

import { TrainingProperty } from '../../swagger/training/training-property';
import { TrainingWithPagination } from '../../types/training-with-pagination.type';
import { CommonProperty } from '../../swagger/common-property';

export class TrainingWithPaginationRdo implements TrainingWithPagination {
  @ApiProperty(TrainingProperty.TrainingCatalog.Description)
  @Type(() => TrainingRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingRdo[];

  @Expose()
  @ApiProperty(CommonProperty.TotalPages.Description)
  public totalPages: number;

  @Expose()
  @ApiProperty(CommonProperty.TotalItems.Description)
  public totalItems: number;

  @Expose()
  @ApiProperty(CommonProperty.CurrentPage.Description)
  public currentPage: number;

  @Expose()
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  public itemsPerPage: number;

  @Expose()
  @ApiProperty(TrainingProperty.MaxAllPrice.Description)
  public maxAllPrice: number;
}
