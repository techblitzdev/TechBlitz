'use client';
import AnimatedSpan from '@/components/ui/animated-span';
import ProfilePicture from '@/components/ui/profile-picture';
import { UserRecord } from '@/types/User';
import { getUserDisplayName } from '@/utils/user';
import { motion } from 'framer-motion';
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
    <section className="w-full py-8 md:pb-28 flex flex-col gap-y-4 justify-between items-center">
      <div className="flex flex-col gap-y-3 md:mb-8 relative items-center">
        <h1 className="text-3xl md:text-5xl text-wrap text-center font-inter max-w-2xl text-gradient from-white to-white/55 relative z-10">
          Leaderboard
        </h1>
        <p className="text-sm text-gray-400 relative z-10 text-center">
          See how you stack up against the rest of the community and become the
          best!
        </p>
        <div className="hidden md:flex">
          <AnimatedSpan content="Top Users" />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-end perspective-1000 relative">
        {podiumOrder.map((index) => {
          const user = topThreeUsers[index];
          const position = index + 1;
          return (
            <motion.div
              key={user.uid}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: position * 0.3,
                type: 'spring',
                stiffness: 100,
              }}
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
                <motion.div
                  className={`flex flex-col items-center mb-2 md:mb-4 z-20 relative ${
                    position === 3 ? '-top-4' : ''
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: position * 0.2,
                    type: 'spring',
                    bounce: 0.2,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <ProfilePicture
                      src={user.userProfilePicture}
                      alt={`${user.username} profile picture`}
                      className="size-8 md:size-12 rounded-full shadow-lg"
                    />
                    {position === 1 && (
                      <motion.div
                        className="absolute -top-3 left-4 size-4"
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.8,
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        <Crown className="size-4 text-yellow-500 fill-yellow-400" />
                      </motion.div>
                    )}
                    {user.userLevel === 'PREMIUM' && (
                      <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: position * 0.2 + 0.3 }}
                        className="relative -top-3 left-1.5 w-fit bg-accent text-xs flex items-center justify-center px-2 py-0.5 rounded-full"
                      >
                        <span className="text-[10px]">PRO</span>
                      </motion.div>
                    )}
                    {user.userLevel === 'ADMIN' && (
                      <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: position * 0.2 + 0.3 }}
                        className="relative -top-3 w-fit bg-accent text-xs flex items-center justify-center px-2 py-0.5 rounded-full"
                      >
                        <span className="text-[10px]">ADMIN</span>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.span
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: position * 0.2 + 0.2 }}
                    className="text-sm md:text-base font-semibold line-clamp-1"
                  >
                    {getUserDisplayName(user as unknown as UserRecord)}
                  </motion.span>
                  <motion.span
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: position * 0.2 + 0.3 }}
                    className="text-sm text-white"
                  >
                    {user._count.answers} answers
                  </motion.span>
                </motion.div>
                {/** top of the podium */}
                <div
                  className={`absolute inset-0 transform-3d rotate-x-55 rotate-y-45 ${
                    position === 1
                      ? 'bg-[#383737]'
                      : position === 2
                        ? 'bg-black-100'
                        : 'bg-black-100'
                  }`}
                  style={{
                    transform: `rotateX(81deg)`,
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
                        {position === 1 ? 'st' : position === 2 ? 'nd' : 'rd'}
                      </span>
                    </div>
                    {/** bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#000] to-transparent rotate-180 -top-px"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#000] to-transparent rotate-180 -top-px"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
