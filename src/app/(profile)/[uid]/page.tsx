import ProfileHero from '@/components/profile/hero/hero';
import { useUserServer } from '@/hooks/use-user-server';
import { getUserProfileByUsername } from '@/utils/data/user/profile/get-user-profile';
import { notFound } from 'next/navigation';

export default async function ProfilePage({ params }: { params: { uid: string } }) {
  const { uid } = params;

  // get the profile of the user - this is different to the user viewing
  const { user: userProfileData } = await getUserProfileByUsername(uid);
  const user = await useUserServer();

  if (!userProfileData) {
    return notFound();
  }

  return (
    <>
      <ProfileHero userProfileData={userProfileData} user={user} />
    </>
  );
}
