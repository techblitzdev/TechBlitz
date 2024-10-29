'use client';
import { logout } from '@/actions/user/logout';
import { useRouter } from 'next/navigation';

import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export default function LogoutButton(otps: {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  padding?: 'sm' | 'lg' | 'md' | 'xl' | 'none' | null | undefined;
}) {
  const { variant = 'default', padding = 'md' } = otps;

  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Button
      className="w-full flex items-center gap-x-2"
      variant={variant}
      onClick={handleLogout}
      padding={padding}
    >
      <p className="text-xs">Logout</p>
      <ExitIcon className="size-3" />
    </Button>
  );
}
