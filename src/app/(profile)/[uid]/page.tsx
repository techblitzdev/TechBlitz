//import { getOrCreateUserProfile } from '@/utils/data/user/profile/get-user-profile';

import ProfilePicture from '@/components/ui/profile-picture';
import { getUserProfileByUsername } from '@/utils/data/user/profile/get-user-profile';
import { getUserDisplayName } from '@/utils/user';
import { Camera } from 'lucide-react';

export default async function ProfilePage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;

  // get the profile of the user
  const { user, profile } = await getUserProfileByUsername(uid);

  return (
    <section className="relative h-64 w-full bg-black-100 border-b border-black-50">
      <div className="absolute top-8 right-8">
        <Camera className="size-8 text-white" />
      </div>
      <div className="absolute flex flex-col md:flex-row items-center gap-10 bottom-[calc(-96px)] md:bottom-[-64px] left-6">
        <div className="relative size-48 overflow-hidden rounded-full border-4 border-black-50">
          <ProfilePicture
            src={user?.userProfilePicture ?? ''}
            alt={
              user
                ? `${getUserDisplayName(user)}'s profile photo`
                : 'Profile photo'
            }
            className="size-full"
          />
        </div>
        <h1 className="text-6xl font-bold text-gradient from-white/55 to-white">
          {getUserDisplayName(user)}
        </h1>
      </div>
    </section>
  );
}
