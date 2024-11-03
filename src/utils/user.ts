import { UserRecord } from '@/types/User';

export const getUserDisplayName = (user: UserRecord) => {
  return (
    user?.username ||
    (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : null) ||
    user?.email
  )
};
