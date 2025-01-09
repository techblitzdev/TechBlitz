import '../globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/global/navigation/sidebar';
import { CSPostHogProvider } from '../providers';
import SidebarLayout from './providers';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import NextTopLoader from 'nextjs-toploader';
import { createMetadata } from '@/utils';
import { useUserServer } from '@/hooks/use-user-server';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import { userAnsweredDailyQuestion } from '@/utils/data/questions/user-answered-daily-question';

export async function generateMetadata() {
  return createMetadata({
    title: 'techblitz',
    description: 'Improve your code knowledge, one day at a time.',
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, todaysQuestion] = await Promise.all([
    useUserServer(),
    getTodaysQuestion(),
  ]);

  const hasAnsweredDailyQuestion = await userAnsweredDailyQuestion({
    questionUid: todaysQuestion?.uid || '',
    userUid: user?.uid || '',
  });

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar
            user={user}
            todaysQuestion={todaysQuestion}
            hasAnsweredDailyQuestion={hasAnsweredDailyQuestion}
          />
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
