export const RequestTrain = {
  Send: 'send',
  Accept: 'accept',
  Reject: 'reject',
} as const;

export type RequestTrain = (typeof RequestTrain)[keyof typeof RequestTrain];
