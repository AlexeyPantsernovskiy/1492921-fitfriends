import { Comment } from '@project/shared-core';
import { UserRdo } from '@project/user';
import { ApiProperty } from '@nestjs/swagger';

export class TrainingCommentApiDoc implements Comment {
  @ApiProperty({
    description: 'ID comment',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'User Id',
    example: '677cd8d75ff92067f1de5911',
  })
  public userId!: string;

  @ApiProperty({
    description: 'ID of training',
    example: '1',
  })
  public trainingId!: number;

  @ApiProperty({
    description: 'rating',
    example: '5',
  })
  rating: number;

  @ApiProperty({
    description: 'Comment message',
    example: 'Some comment for post',
  })
  public message!: string;

  @ApiProperty({
    description: 'Date of comment',
    example: '2024-02-15T13:43:22+07:00',
  })
  public createdAt!: Date;

  @ApiProperty({
    description: 'User info',
    required: false,
  })
  userInfo: UserRdo;
}
