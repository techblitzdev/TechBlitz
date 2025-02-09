import '../globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/navigation/sidebar';
import { CSPostHogProvider } from '../providers';
import SidebarLayout from './providers';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import NextTopLoader from 'nextjs-toploader';
import { createMetadata } from '@/utils/seo';
import { useUserServer } from '@/hooks/use-user-server';
import { getOrCreateUserProfile } from '@/utils/data/user/profile/get-user-profile';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

export async function generateMetadata() {
  return createMetadata({
    title: 'techblitz',
    description: 'Improve your code knowledge, one day at a time.',
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, profile, suggestion] = await Promise.all([
    useUserServer(),
    getOrCreateUserProfile(),
    getSuggestions({ limit: 1 }),
  ]);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar user={user} profile={profile} suggestion={suggestion?.[0]} />
          <NextTopLoader color="#5b61d6" showSpinner={false} />
          <SidebarLayout>
            <CSPostHogProvider>
              <MantineProvider>{children}</MantineProvider>
            </CSPostHogProvider>
          </SidebarLayout>
          <Toaster className="bg-black" />
        </SidebarProvider>
      </body>
    </html>
  );
}
