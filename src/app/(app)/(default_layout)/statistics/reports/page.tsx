import dynamic from 'next/dynamic';

const StatsReportCardsWrapper = dynamic(
  () => import('@/components/app/statistics/stats-report-cards-wrapper'),
  {
    ssr: false,
    loading: () => (
      <>
        {[...Array(6)].map((_, i) => (
          <StatsReportCardSkeleton key={`skeleton-${i}`} />
        ))}
      </>
    ),
  }
);

import Hero from '@/components/shared/hero';
import StatsReportCardSkeleton from '@/components/app/statistics/stats-report-card-loading';
import GenerateReportButton from '@/components/app/statistics/generate-report-button';
import UpgradeLayout from '@/components/app/shared/upgrade/upgrade-layout';
import { useUserServer } from '@/hooks/use-user-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUpgradeUrl } from '@/utils';

const upgradeDescription = (
  <div className="flex flex-col gap-y-2">
    <p className="text-gray-400">
      Looking for an in-depth analysis of your coding skills? Upgrade to Premium to generate
      detailed reports.{' '}
      <Link href={getUpgradeUrl()} className="text-accent underline">
        Learn more
      </Link>
    </p>
  </div>
);

export default async function StatisticsReportsPage() {
  const user = await useUserServer();
  if (!user) return redirect('/login');
  if (user.userLevel === 'FREE') {
    return <UpgradeLayout title="Reports" description={upgradeDescription} />;
  }

  return (
    <>
      <Hero
        heading="Reports"
        subheading="You can view the accuracy of your questions and the questions you've answered. We have also generated personalized questions to help you improve your skills."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <StatsReportCardsWrapper />
        </div>
        <aside className="w-full lg:w-[45%] relative">
          <GenerateReportButton />
        </aside>
      </div>
    </>
  );
}
