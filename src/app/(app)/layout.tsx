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
  const isDevelopment = process.env.NODE_ENV === 'development';
  const user = await useUserServer();
  
  if (!isDevelopment && !user) {
    redirect('/login?r=no-auth');
  }

  return (
    <MantineProvider>
      {!isDevelopment &&   
             <CSPostHogProvider>
            <MantineProvider>{children}</MantineProvider>
          </CSPostHogProvider>}
      <NextTopLoader color="#000" />
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 overflow-x-hidden">
            <main className="min-h-screen bg-background">
              {children}
              <Toaster />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </MantineProvider>
  );
}
