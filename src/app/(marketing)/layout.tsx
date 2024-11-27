import type { Metadata } from 'next';
import { InterFont, SatoshiFont, UbuntuFont } from '../styles/fonts/font';
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

export const metadata: Metadata = {
  title: 'techblitz',
  description: 'Improve your code knowledge, one day at a time.'
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
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <main>
            <StarsBackground className="-z-10" />
            <CSPostHogProvider>
              <MantineProvider>{children}</MantineProvider>
            </CSPostHogProvider>
          </main>
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
