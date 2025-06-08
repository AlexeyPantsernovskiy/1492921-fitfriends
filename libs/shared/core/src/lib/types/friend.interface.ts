import { RequestTrain } from './request-train.enum';

export interface Friend {
  id?: string;
  userId: string;
  friendId: string;
  requestTrain?: RequestTrain;
  requestUserId?: string;
}
