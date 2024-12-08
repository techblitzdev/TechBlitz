import type { Metadata } from 'next';
import {
  InterFont,
  OnestFont,
  SatoshiFont,
  UbuntuFont
} from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/global/navigation/sidebar';
import { CSPostHogProvider } from '../providers';

import { createTheme, MantineProvider } from '@mantine/core';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { StarsBackground } from '@/components/ui/stars-background';
import MarketingNavigation from '@/components/marketing/global/navigation';
import MarketingFooter from '@/components/marketing/global/footer';

export const metadata: Metadata = {
  title: 'techblitz | The all-in-one platform for developers',
  description: 'Improve your code knowledge, one day at a time.',
  keywords: [
    'coding',
    'programming',
    'software engineering',
    'web development',
    'ai',
    'machine learning',
    'education'
  ],
  openGraph: {
    title: 'techblitz | The all-in-one platform for developers',
    description: 'Improve your code knowledge, one day at a time.',
    type: 'website',
    url: 'https://techblitz.dev',
    images: {
      url: 'https://opengraph.b-cdn.net/production/images/863d8e33-33f7-41ed-a987-983e8cc4c7f4.png?token=ASFBmVA1xTYODlK0Qt38ZI3qFDVAR4ChDCoLriKFC5o&height=550&width=1200&expires=33269672893',
      width: 800,
      height: 630,
      alt: 'techblitz | The all-in-one platform for developers'
    }
  },
  twitter: {
    title: 'techblitz | The all-in-one platform for developers',
    description: 'Improve your code knowledge, one day at a time.',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/863d8e33-33f7-41ed-a987-983e8cc4c7f4.png?token=ASFBmVA1xTYODlK0Qt38ZI3qFDVAR4ChDCoLriKFC5o&height=550&width=1200&expires=33269672893'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

const theme = createTheme({});

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <main>
            <StarsBackground className="-z-10" />
            <CSPostHogProvider>
              <MantineProvider>
                <MarketingNavigation />
                {children}
                <MarketingFooter />
              </MantineProvider>
            </CSPostHogProvider>
          </main>
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
