import { PodiumItem } from '@/components/app/leaderboard/leaderboard-hero';
import { UserRecord } from '@/types/User';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';

export default async function LeaderboardPodiumShowcase() {
  const topThreeUsers = await getMostQuestionsAnswered(3);
  const podiumOrder = [1, 0, 2];

  return (
    <section className="w-full py-8 md:mb-28 flex gap-10 justify-between items-center">
      <div className="flex flex-col gap-y-4 pt-24">
        <h2 className="text-2xl lg:text-4xl text-gradient from-white/55 to-white">
          Battle your way to the top
        </h2>
        <p className="text-base md:text-lg text-gray-400">
          See how you stack up against the rest of the community and become the
          best - The top 3 users get a special place at the top!
        </p>
      </div>
      <div className="hidden md:flex justify-center items-end perspective-1000 relative">
        {podiumOrder.map((index: number) => {
          const user = topThreeUsers[index];
          if (!user) return null;
          const position = index + 1;
          return (
            <PodiumItem
              key={user.uid}
              user={
                user as unknown as UserRecord & { _count: { answers: number } }
              }
              position={position}
            />
          );
        })}
      </div>
    </section>
  );
}
