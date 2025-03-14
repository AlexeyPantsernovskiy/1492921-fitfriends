import { UserProperty } from './user-property';

export const UserParam = {
  UserId: {
    name: 'userId',
    type: String,
    schema: UserProperty.Id,
  },
} as const;
