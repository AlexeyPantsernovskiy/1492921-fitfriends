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

  @ApiProperty(CommonProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(CommonProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;

  @ApiProperty(TrainingProperty.MaxAllPrice.Description)
  @Expose()
  public maxAllPrice: number;
}
