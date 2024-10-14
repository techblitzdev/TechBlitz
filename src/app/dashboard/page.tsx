import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';
import AdminButton from '@/components/admin-button';
import DashboardBentoGrid from '@/components/dashboard/dashboard-bento-grid';
import UserProfileDropdown from '@/components/global/user-profile-dropdown';
import { Separator } from '@/components/ui/separator';

export default async function Dashboard() {
  // get our current user
  const { data: user } = await getUserFromSession();
  if (!user || !user.user?.id) return;
  // get the user from the db
  const userData = await getUserFromDb(user.user.id);

  if (!userData || userData === null) return;

  return (
    <div className="container py-12 text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Welcome back!
        </h1>
        <UserProfileDropdown userData={userData} />
        {/** userData?.userLevel === 'ADMIN' && <AdminButton /> */}
      </div>
      <Separator />
      <DashboardBentoGrid />
    </div>
  );
}
