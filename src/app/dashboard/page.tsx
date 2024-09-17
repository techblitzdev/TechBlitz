import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';

export default async function Dashboard() {
  // get our current user
  const user = await getUserFromSession();
  if (!user || !user?.data?.user.id) return;

  // get the user from the db
  const userData = await getUserFromDb(user.data.user.id);

  console.log('userData', userData);

  return (
    <div className="container text-white">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p>UserId: {user.data.user?.id}</p>
      <p>User email: {userData?.email}</p>
      <p>User role: {userData?.userLevel}</p>
    </div>
  );
}
