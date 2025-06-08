import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

import { Friend, REQUEST_TRAIN, RequestTrain } from '@project/shared-core';

@Schema({
  collection: 'friends',
  timestamps: {
    createdAt: 'createDate',
    updatedAt: false,
  },
})
export class FriendModel extends Document implements Friend {
  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public friendId: string;

  @Prop({ type: String, enum: REQUEST_TRAIN, required: false })
  public requestTrain: RequestTrain;

  @Prop({ required: false })
  public requestUserId: string;

  @Prop({ default: now })
  public createDate: Date;
}

export const FriendSchema = SchemaFactory.createForClass(FriendModel);
