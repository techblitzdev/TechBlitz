import AnimatedSpan from '@/components/ui/animated-span';
import LeaderboardFeaturesLeft from './leaderboard-features-left';
import LeaderboardFeaturesRight from './leaderboard-features-right';

export default function LeaderboardFeatures() {
  return (
    <section className="pt-44 md:pt-10 pb-28 md:container flex flex-col gap-10">
      <div className="flex flex-col gap-2.5 md:px-12">
        <AnimatedSpan content="Leaderboard Features" />
        <h1 className="text-3xl lg:text-5xl font-onest !font-medium tracking-tight text-gradient from-white to-white/55 py-1">
          Learning to code does not have to be boring.
        </h1>
        <p className="text-gray-400">
          Leaderboards give you a sense of progress and help you stay motivated
          when learning to code. Be part of the community and see how you stack
          up against your peers.
        </p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-12 gap-10 self-center relative">
        <div
          aria-hidden="true"
          className="hidden lg:block left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        <LeaderboardFeaturesLeft />
        <LeaderboardFeaturesRight />
      </div>
    </section>
  );
}
