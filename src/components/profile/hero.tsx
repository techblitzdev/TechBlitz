import { UserRecord } from '@/types/User';
import ProfilePicture from '../ui/profile-picture';
import { Camera } from 'lucide-react';
import { getUserDisplayName } from '@/utils/user';

export default function ProfileHero(opts: { user: UserRecord }) {
  const { user } = opts;

  return (
    <section className="relative h-64 w-full bg-black-100 border-b border-black-50">
      <div className="absolute top-8 right-8">
        <Camera className="size-8 text-white" />
      </div>
      <div className="absolute flex flex-col md:flex-row items-center gap-10 bottom-[calc(-96px)] md:bottom-[-64px] left-6">
        <div className="relative size-48 rounded-full border-4 border-black-50">
          <ProfilePicture
            src={user?.userProfilePicture ?? ''}
            alt={
              user
                ? `${getUserDisplayName(user)}'s profile photo`
                : 'Profile photo'
            }
            className="size-full"
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent rounded-full px-2 py-1 w-fit z-10">
            <p className="text-sm text-white">{user.userLevel}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-6xl font-bold text-gradient from-white/55 to-white">
            {getUserDisplayName(user)}
          </h1>
        </div>
      </div>
    </section>
  );
}
