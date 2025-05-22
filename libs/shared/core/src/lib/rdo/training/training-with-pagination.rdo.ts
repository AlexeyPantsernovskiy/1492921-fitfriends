import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TrainingRdo } from './training.rdo';

import { TrainingProperty } from '../../swagger/training/training-property';
import { TrainingWithPagination } from '../../types/training-with-pagination.type';
import { PaginationRdo } from '../training-with-pagination.rdo';

export class TrainingWithPaginationRdo
  extends PaginationRdo
  implements TrainingWithPagination
{
  @ApiProperty(TrainingProperty.TrainingCatalog.Description)
  @Type(() => TrainingRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: TrainingRdo[];

  @ApiProperty(TrainingProperty.MaxAllPrice.Description)
  @Expose()
  public maxAllPrice: number;
}
