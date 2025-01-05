import '../globals.css';
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
import { createMetadata } from '@/utils';
import { useUserServer } from '@/hooks/use-user-server';

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

  return (
    <SidebarProvider>
      {/* Scrollable content */}
      <AppSidebar user={user} />
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
  );
}
