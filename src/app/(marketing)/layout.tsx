import type { Metadata } from 'next';
import {
  InterFont,
  OnestFont,
  SatoshiFont,
  UbuntuFont,
} from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/global/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { CSPostHogProvider } from '../providers';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

// Dynamically import components that are not needed immediately
const MarketingNavigation = dynamic(
  () => import('@/components/marketing/global/navigation/navigation'),
  { ssr: true } // Keep SSR for SEO
);

const MarketingFooter = dynamic(
  () => import('@/components/marketing/global/footer/footer'),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import('@/components/global/cookie-banner'),
  {
    ssr: false,
  }
);

const StarsBackground = dynamic(
  () => import('@/components/ui/stars-background'),
  {
    ssr: false,
  }
);

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
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
        >
          <main>
            <StarsBackground className="-z-10" />
            <CSPostHogProvider>
              <MantineProvider>
                <MarketingNavigation />
                {children}
                <CookieBanner />
                <MarketingFooter />
              </MantineProvider>
            </CSPostHogProvider>
          </main>
          <Analytics />
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
