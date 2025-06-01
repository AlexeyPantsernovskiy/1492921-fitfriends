import { TrainingCommentWithPagination } from '@project/shared-core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TrainingCommentRdo } from './training-comment.rdo';

export class TrainingCommentWithPaginationRdo
  implements TrainingCommentWithPagination
{
  @ApiProperty({
    description: 'comments',
    type: TrainingCommentRdo,
  })
  @Expose()
  @Type(() => TrainingCommentRdo)
  public entities: TrainingCommentRdo[];

  @ApiProperty({
    description: 'Total page count of selected entity',
    example: 10,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page number',
    example: 2,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Total items count of selected entity',
    example: 50,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Number of items on one page',
    example: 20,
  })
  @Expose()
  public itemsPerPage: number;
}
