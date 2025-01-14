import { getUserDisplayName } from '@/utils/user';
import { UserRecord } from '@/types/User';

interface WelcomeMessageProps {
  user: UserRecord;
}

export default function WelcomeMessage({ user }: WelcomeMessageProps) {
  return (
    <h1 className="text-2xl font-bold">
      Welcome back, {getUserDisplayName(user)}
    </h1>
  );
}
