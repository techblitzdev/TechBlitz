import ProfileHero from '@/components/profile/hero';
import { getUserProfileByUsername } from '@/utils/data/user/profile/get-user-profile';
import { notFound } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;

  // get the profile of the user
  const { user } = await getUserProfileByUsername(uid);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <ProfileHero user={user} />
    </>
  );
}
