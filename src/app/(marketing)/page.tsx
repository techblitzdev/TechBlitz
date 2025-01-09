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

import DashboardImg from '../../public/images/dashboard-img-2.png';
import SocialProof from '@/components/marketing/global/social-proof';
import { fetchGithubStars } from '@/utils/data/misc/get-github-stars';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import { getUserCount } from '@/utils/data/user/get-user-count';
import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';

const title =
  'techblitz | The all-in-one platform for learning software engineering';
const description =
  'TechBlitz is a community of like-minded software engineers looking to expand their knowledge. Daily coding challenges, ai-powered coding roadmaps, in depths statistics and much more. Sign up for free now!';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'software engineering',
    'coding challenges',
    'AI-powered learning',
    'personalized coding roadmap',
    'tech community',
    'full-stack development',
    'data structures and algorithms',
    'coding statistics',
    'continuous learning',
    'career advancement',
    'coding best practices',
    'tech skills assessment',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://techblitz.dev',
    images: {
      url: 'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
      width: 800,
      height: 630,
      alt: description,
    },
  },
  twitter: {
    title,
    description,
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
        width: 800,
        height: 630,
        alt: description,
      },
    ],
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  // run all actions in parallel
  const [dailyQuestion, userCount, githubStars] = await Promise.all([
    getTodaysQuestion(),
    getUserCount(),
    fetchGithubStars(),
  ]);

  const roundedCount = Math.round(userCount / 10) * 10;

  const homepageHeroIframe =
    'https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/e49b63ed5ee42085d838a50928855776/iframe?poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2Fe49b63ed5ee42085d838a50928855776%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600';

  return (
    <div className="overflow-x-hidden">
      <div className="z-30">
        <div className="container">
          <HomepageHero />
          <HomepageHeroImages
            imageSrc={DashboardImg}
            videoSrc={homepageHeroIframe}
            videoPoster="https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/e49b63ed5ee42085d838a50928855776/iframe?poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2Fe49b63ed5ee42085d838a50928855776%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
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
