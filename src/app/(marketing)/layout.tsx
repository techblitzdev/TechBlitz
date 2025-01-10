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
import MarketingNavigation from '@/components/marketing/global/navigation/navigation';

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} overflow-x-hidden antialiased`}
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
