import { cn } from '@/lib/utils';
import { getUserXp } from '@/utils/data/user/authed/get-user-xp';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import BoltLightning from './icons/bolt-lightning';

interface UserXpProps {
  className?: string;
}

async function UserXpData() {
  const { userXp } = await getUserXp();

  return <p className="font-onest font-medium text-black dark:text-white">{userXp} XP</p>;
}

export default async function UserXp({ className }: UserXpProps) {
  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      <BoltLightning className="size-6" />
      <Suspense fallback={<LoadingSpinner />}>
        <UserXpData />
      </Suspense>
    </div>
  );
}
