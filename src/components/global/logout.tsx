'use client';
import { logout } from '@/actions/user/logout';
import { useRouter } from 'next/navigation';

import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Button
      className="w-full py-1 px-4 flex items-center gap-x-2"
      variant="default"
      onClick={handleLogout}
    >
      <p className="text-xs">Logout</p>
      <ExitIcon className="size-3" />
    </Button>
  );
}
