import { getUserFromSession } from '@/actions/user/get-user';

export default async function Dashboard() {
  // get our current user
  const user = await await getUserFromSession();
  if (!user) return;

  return (
    <div className="container text-white">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p>Welcome {user.data.user?.id}</p>
    </div>
  );
}
