import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';
import HomepageHeroImages from '@/components/marketing/homepage/hero/hero-images';
import FeaturesBentoGrid from '@/components/marketing/homepage/features/features-bento-grid';
const HomepageLargeText = dynamic(
  () => import('@/components/marketing/large-text'),
  { ssr: false }
);
import ComparisonBlock from '@/components/marketing/homepage/comparison/comparison-block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';

import DashboardImg from '../../public/images/dashboard-img.png';
import SocialProof from '@/components/marketing/global/social-proof';
import { prisma } from '@/utils/prisma';
import { fetchGithubStars } from '@/actions/misc/get-github-stars';
import { getTodaysQuestion } from '@/actions/questions/get-today';

export default async function Page() {
  // run all actions in parallel
  const [dailyQuestion, userCount, githubStars] = await Promise.all([
    getTodaysQuestion(),
    prisma.users.count(),
    fetchGithubStars(),
  ]);

  const roundedCount = Math.round(userCount / 10) * 10;

  const homepageHeroImg = DashboardImg;
  const homepageHeroIframe =
    'https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/ff823c820a5dc793c091f43ebae09d63/iframe?poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2Fff823c820a5dc793c091f43ebae09d63%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600';

  return (
    <div className="overflow-x-hidden">
      <div className="z-30">
        <div className="container">
          <HomepageHero />
          <HomepageHeroImages
            imageSrc={homepageHeroImg}
            videoSrc={homepageHeroIframe}
            videoPoster="https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/ff823c820a5dc793c091f43ebae09d63/thumbnails/thumbnail.jpg?time=&height=600"
          />
          <SocialProof
            userCount={roundedCount}
            githubStars={githubStars.stargazers_count}
            dailyQuestion={dailyQuestion}
          />
          <FeaturesBentoGrid />
          <HomepageLargeText />
          <ComparisonBlock />
          <OpenSourceBlock />
          <CallToActionBlock title="Your gateway to your dream career" />
        </div>
      </div>
    </div>
  );
}
