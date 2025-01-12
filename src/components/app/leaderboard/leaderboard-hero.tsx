import { Grid } from '@/components/ui/grid';
import ProfilePicture from '@/components/ui/profile-picture';
import { UserRecord } from '@/types/User';
import { shortenText } from '@/utils';
import { getUserDisplayName } from '@/utils/user';
import { Crown } from 'lucide-react';

/**
 * This will show the top three users on TechBlitz in a podium style with a 3D isometric look.
 *
 * @returns
 */
export default function LeaderboardHero(opts: {
  topThreeUsers: UserRecord[] &
    {
      _count: { answers: number };
    }[];
}) {
  const { topThreeUsers } = opts;

  const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd

  return (
    <section className="w-full py-8 flex flex-col gap-y-4 justify-between items-center">
      <div className="flex flex-col gap-y-3 mb-8 relative">
        <h1 className="text-3xl md:text-5xl text-wrap text-center font-inter max-w-2xl text-gradient from-white to-white/55 relative z-10">
          Leaderboard
        </h1>
        <p className="text-sm text-gray-400 relative z-10">
          See how you stack up against the rest of the community, and try to
          battle your way to the top!
        </p>
      </div>
      <div className="flex justify-center items-end perspective-1000 relative">
        {podiumOrder.map((index) => {
          const user = topThreeUsers[index];
          const position = index + 1;
          return (
            <div
              key={user.uid}
              className={`flex flex-col items-center ${
                position === 1
                  ? 'order-2'
                  : position === 2
                    ? 'order-1'
                    : 'order-3'
              }`}
            >
              <div
                className={`relative ${
                  position === 1
                    ? 'size-28 md:size-64'
                    : position === 2
                      ? 'size-24 md:h-48 md:w-64'
                      : 'size-24 md:h-40 md:w-64'
                }`}
              >
                <div
                  className={`flex flex-col items-center mb-2 md:mb-4 z-20 relative ${
                    position === 3 ? '-top-4' : ''
                  }`}
                >
                  <div className="relative">
                    <ProfilePicture
                      src={user.userProfilePicture}
                      alt={`${user.username} profile picture`}
                      className="size-6 md:size-8 rounded-full shadow-lg"
                    />
                    {/** if first, add a crown top right of the profile picture */}
                    {position === 1 && (
                      <div className="absolute -top-3 left-2 size-4">
                        <Crown className="size-4 text-yellow-500 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                  <span className="mt-2 text-sm md:text-base font-semibold line-clamp-1">
                    {getUserDisplayName(user as unknown as UserRecord)}
                  </span>
                  <span className="text-sm text-white">
                    {user._count.answers} answers
                  </span>
                </div>
                {/** top of the podium */}
                <div
                  className={`absolute inset-0 transform-3d rotate-x-55 rotate-y-45 ${
                    position === 1
                      ? 'bg-[#202020]'
                      : position === 2
                        ? 'bg-black-100'
                        : 'bg-black-100'
                  }`}
                  style={{
                    transform: `rotateX(78deg)`,
                  }}
                >
                  {/** bottom of the podium */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 h-full origin-bottom rotate-x-90 ${
                      position === 1
                        ? 'bg-black-50'
                        : position === 2
                          ? 'bg-black-200'
                          : 'bg-black-200'
                    }`}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center rotate-180"
                      style={{
                        transform: `rotateX(180deg)`,
                      }}
                    >
                      <span className="text-2xl md:text-5xl font-bold text-gradient from-white to-white/55 font-onest">
                        {position}
                      </span>
                    </div>
                    {/** bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#000] to-transparent rotate-180 -top-px"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#000] to-transparent rotate-180 -top-px"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
