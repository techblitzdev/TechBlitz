import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';
import AdminButton from '@/components/admin-button';
import TodayTaskList from '@/components/dashboard/today-task-list';

export default async function Dashboard() {
  // get our current user
  const { data: user } = await getUserFromSession();
  if (!user || !user.user?.id) return;

  // get the user from the db
  const userData = await getUserFromDb(user.user.id);

  return (
    <div className="container text-white">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      {userData?.userLevel === 'ADMIN' && <AdminButton />}
      <p>UserId: {user.user?.id}</p>
      <p>User email: {userData?.email}</p>
      <p>User role: {userData?.userLevel}</p>
      <TodayTaskList />
    </div>
  );
}
