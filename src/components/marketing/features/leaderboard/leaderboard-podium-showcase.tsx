import { PodiumItem } from '@/components/app/leaderboard/leaderboard-hero';
import { Button } from '@/components/ui/button';
import { UserRecord } from '@/types/User';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';

export default async function LeaderboardPodiumShowcase() {
  const topThreeUsers = await getMostQuestionsAnswered(3);
  const podiumOrder = [1, 0, 2];

  return (
    <section className="w-full py-8 md:mb-28 flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-center">
      <div className="flex flex-col gap-y-4 lg:pt-44 items-center lg:items-start">
        <h2 className="text-2xl lg:text-4xl text-center lg:text-left text-gradient from-white/55 to-white">
          Climb to the Top of the Leaderboard
        </h2>
        <p className="text-sm md:text-lg text-gray-400 text-center lg:text-left max-w-3xl">
          Challenge yourself and see how you rank against the community. The top
          3 achievers earn a prestigious spot on the podium!
        </p>
        <Button href="/leaderboard" variant="secondary">
          Explore the Leaderboard
        </Button>
      </div>
      <div className="flex justify-center items-end perspective-1000 relative">
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
