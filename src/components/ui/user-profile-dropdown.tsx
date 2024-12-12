import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import LogoutButton from '../auth/logout';
import AdminButton from '@/components/admin-button';
import {
  getUserFromDb,
  getUserFromSession
} from '@/actions/user/authed/get-user';
import Link from 'next/link';
import Image from 'next/image';
import { getUserDisplayName } from '@/utils/user';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

export default async function UserProfileDropdown() {
  // get our current user
  const { data: user } = await getUserFromSession();
  if (!user || !user.user?.id) return;
  // get the user from the db
  const userData = await getUserFromDb(user.user.id);
  // the middleware should catch this to prevent the page from rendering
  if (!userData) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="https://www.gravatar.com/avatar/default"
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-75 text-white border-black-75 w-56"
        align="end"
      >
        <DropdownMenuItem
          preventDefaultOnClick
          className="hover:bg-white hover:text-black duration-100"
        >
          <Sheet>
            <SheetTrigger className="font-semibold font-satoshi w-full text-xs text-start">
              My profile @{userData && getUserDisplayName(userData)}
            </SheetTrigger>
          </Sheet>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <DropdownMenuItem className="text-xs hover:bg-white hover:text-black duration-100">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs hover:bg-white hover:text-black duration-100">
          Support
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-white hover:text-black duration-100 text-xs">
          <Link
            href={`${process.env.CHECKOUT_URL}`}
            prefetch
          >
            Upgrade account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <div className="flex flex-col gap-y-1">
          <LogoutButton />
          {userData?.userLevel == 'ADMIN' && (
            <AdminButton className="w-full text-xs" />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
