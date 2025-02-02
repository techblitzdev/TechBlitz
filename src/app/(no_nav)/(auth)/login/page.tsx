import LoginForm from '@/components/auth/login';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Login | TechBlitz',
    description: 'Login to your account to continue.',
    image: {
      text: 'Login | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/login',
  });
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUrl: string; onboarding: string };
}) {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/login`,
    headline: 'Login | TechBlitz',
    description:
      'Curated lists of coding questions, ranging from Javascript, React, Node, Web Development. Perfect for your daily coding practice.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getBaseUrl(),
    },
    keywords:
      'learn to code for free, beginner-friendly coding lessons, interactive coding challenges, daily programming practice, personalized coding roadmap, improve coding skills, best platform to learn coding, AI-assisted coding, learn javascript',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
  };

  const { redirectUrl, onboarding } = searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className="border border-black-50 p-8 rounded-xl space-y-4 text-center"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <h1 className="font-bold text-3xl mb-2">Welcome back!</h1>
        <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
          Sign in to your account to continue.
        </p>
        <LoginForm redirectUrl={redirectUrl} onboarding={onboarding} />
      </div>
    </>
  );
}
