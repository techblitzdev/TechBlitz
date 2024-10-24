import { UserRecord } from '@/types/User';

export const getUserDisplayName = (user: UserRecord) => {
  return user.username || `${user.firstName} ${user.lastName}`;
};
