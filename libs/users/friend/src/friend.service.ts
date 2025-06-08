import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FriendEntity } from './friend.entity';
import { FriendRepository } from './friend.repository';
import {
  FriendQuery,
  FriendResponse,
  PaginationResult,
  RequestTrain,
  UpdateOrCheckFriendDto,
} from '@project/shared-core';
import { FriendRdo } from 'libs/shared/core/src/lib/rdo/friend/friend.rdo';
import { fillDto } from '@project/shared-helpers';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  public async addFriend(dto: UpdateOrCheckFriendDto): Promise<FriendRdo> {
    const { userId, friendId } = dto;
    if (userId === friendId) {
      throw new ForbiddenException(FriendResponse.AddingSelf);
    }
    const existsFriend = await this.friendRepository.findFriend(
      userId,
      friendId
    );
    if (existsFriend) {
      throw new ConflictException(FriendResponse.RecordExists);
    }
    const friendEntity = new FriendEntity({ userId, friendId });
    const newFriend = await this.friendRepository.save(friendEntity);
    return fillDto(FriendRdo, newFriend.toPOJO());
  }

  public async deleteFriend(dto: UpdateOrCheckFriendDto) {
    const { userId, friendId } = dto;
    const existsFriend = await this.friendRepository.findFriend(
      userId,
      friendId
    );
    if (!existsFriend) {
      throw new NotFoundException(FriendResponse.FriendNotFound);
    }
    await this.friendRepository.deleteById(existsFriend.id);
  }

  public async getFriends(
    query?: FriendQuery
  ): Promise<PaginationResult<FriendRdo>> {
    const friendsWithPagination = await this.friendRepository.find(query);

    const result = {
      ...friendsWithPagination,
      entities: friendsWithPagination.entities.map((friend) =>
        fillDto(FriendRdo, friend.toPOJO())
      ),
    };
    return result;
  }

  public async requestTrain(dto: UpdateOrCheckFriendDto, action: RequestTrain) {
    const { userId, friendId } = dto;
    const existsFriend = await this.friendRepository.findFriend(
      userId,
      friendId
    );
    if (!existsFriend) {
      throw new NotFoundException(FriendResponse.FriendNotFound);
    }
    if (!existsFriend.requestTrain && action !== RequestTrain.Send) {
      throw new NotFoundException(FriendResponse.RequestNotExists);
    }
    if (
      existsFriend.requestUserId === dto.userId &&
      action !== RequestTrain.Send
    ) {
      throw new ForbiddenException(FriendResponse.RequestSelf);
    }
    if (
      existsFriend.requestTrain === RequestTrain.Send &&
      action === RequestTrain.Send
    ) {
      throw new ConflictException(FriendResponse.RequestExists);
    }
    if (
      existsFriend.requestTrain === RequestTrain.Accept ||
      existsFriend.requestTrain === RequestTrain.Reject
    ) {
      throw new ForbiddenException(FriendResponse.RequestEnd);
    }
    existsFriend.requestTrain = action;
    if (action === RequestTrain.Send) {
      existsFriend.requestUserId = dto.userId;
    }
    const friend = await this.friendRepository.update(existsFriend);
    return fillDto(FriendRdo, friend.toPOJO());
  }
}
