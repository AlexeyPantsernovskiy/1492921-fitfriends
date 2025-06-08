import { RequestTrain } from '../../types/request-train.enum';
import { FriendProperty } from './friend-property';

export const FriendParam = {
  Action: {
    name: 'action',
    type: RequestTrain,
    schema: FriendProperty.RequestTrain.Description,
  },
} as const;
