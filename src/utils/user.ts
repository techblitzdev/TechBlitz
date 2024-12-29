import { UserRecord } from '@/types/User';
import { filterBadWords } from '.';

export const getUserDisplayName = (user: UserRecord) => {
  return filterBadWords(
    user?.username ||
      (user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : null) ||
      'Anonymous'
  );
};
