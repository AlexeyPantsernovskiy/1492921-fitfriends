import {
  Friend,
  MongoEntity,
  RequestTrain,
  StorableEntity,
} from '@project/shared-core';

export class FriendEntity
  extends MongoEntity
  implements StorableEntity<Friend>
{
  public userId: string;
  public friendId: string;
  public requestTrain: RequestTrain;
  public requestUserId: string;

  constructor(friend?: Friend) {
    super();
    this.populate(friend);
  }
  public populate(friend?: Friend): void {
    if (!friend) {
      return;
    }
    const { id, userId, friendId, requestTrain, requestUserId } = friend;

    this.id = id ?? '';
    this.userId = userId;
    this.friendId = friendId;
    this.requestTrain = requestTrain;
    this.requestUserId = requestUserId;
  }

  toPOJO(): Friend {
    return {
      id: this.id,
      userId: this.userId,
      friendId: this.friendId,
      requestTrain: this.requestTrain,
      requestUserId: this.requestUserId,
    };
  }
}
