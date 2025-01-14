import { UserRecord } from '@/types/User';
import { filterBadWords } from '.';

export const getUserDisplayName = (user: UserRecord | null) => {
  if (!user) return 'Anonymous';

  // if this is not a customer username, we return either first name and last name or 'Anonymous'
  if (!user.isCustomUsername) {
    return filterBadWords(
      user?.username ||
        (user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : null) ||
        'Anonymous'
    );
  }

  // if this is a custom username, we return the username
  return filterBadWords(user?.username || 'Anonymous');
};
