import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TrainingRdo } from './training.rdo';

import { TrainingProperty } from '../../swagger/training/training-property';
import { TrainingWithPagination } from '../../types/training-with-pagination.type';

export class TrainingWithPaginationRdo implements TrainingWithPagination {
  @ApiProperty(TrainingProperty.TrainingCatalog.Description)
  @Type(() => TrainingRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingRdo[];

  @Expose()
  @ApiProperty({
    description: 'totalPages',
    example: 10,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'totalItems',
    example: 100,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'currentPage',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'itemsPerPage',
    example: 5,
  })
  public itemsPerPage: number;
}
