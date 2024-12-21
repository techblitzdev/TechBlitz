import {
  InterFont,
  OnestFont,
  SatoshiFont,
  UbuntuFont,
} from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/global/navigation/sidebar';
import { CSPostHogProvider } from '../providers';

import { MantineProvider } from '@mantine/core';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import NextTopLoader from 'nextjs-toploader';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';
import { createMetadata } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'techblitz',
    description: 'Improve your code knowledge, one day at a time.',
  });
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useUserServer();
  if (!user) redirect('/login?r=no-auth');

  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <SidebarProvider>
            {/* Fixed background gradient */}
            {/* <div className="fixed inset-0 bg-gradient-to-t from-[#f0db4f]/5 via-transparent to-transparent pointer-events-none"></div> */}

            {/* Scrollable content */}
            <AppSidebar />
            <NextTopLoader color="#5b61d6" showSpinner={false} />
            <main className="w-full py-6 lg:pt-4 lg:pb-3">
              <div className="h-[95%]">
                <CSPostHogProvider>
                  <MantineProvider>{children}</MantineProvider>
                </CSPostHogProvider>
              </div>
            </main>
            <Toaster className="bg-black" />
          </SidebarProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
