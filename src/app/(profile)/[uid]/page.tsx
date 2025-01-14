//import { getOrCreateUserProfile } from '@/utils/data/user/profile/get-user-profile';

export default async function ProfilePage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;

  // get the profile of the user
  //const profile = await getOrCreateUserProfile(uid);

  return <div>{uid}</div>;
}
