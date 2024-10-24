import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/types/User';
import LogoutButton from './logout';
import AdminButton from '../admin-button';
import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';
import Link from 'next/link';
import Image from 'next/image';
import { getUserDisplayName } from '@/utils/user';

export default async function UserProfileDropdown() {
  // get our current user
  const { data: user } = await getUserFromSession();
  if (!user || !user.user?.id) return;
  // get the user from the db
  const userData = await getUserFromDb(user.user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="https://www.gravatar.com/avatar/default"
          alt="user"
          width={24}
          height={24}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-75 text-whtie border-black-75 w-56"
        align="end"
      >
        {/* <DropdownMenuLabel>Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator className="bg-black-50" /> */}
        <DropdownMenuItem>
          My profile
          <span className="font-semibold font-satoshi">
            &nbsp; @{userData && getUserDisplayName(userData)}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>Account settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`${process.env.CHECKOUT_URL}`}>Upgrade account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <LogoutButton />
        {userData?.userLevel == 'ADMIN' && (
          <DropdownMenuItem className="hover:bg-transparent">
            <AdminButton className="w-full" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
