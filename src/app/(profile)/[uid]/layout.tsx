import { AppSidebar } from '@/components/app/navigation/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUserServer } from '@/hooks/use-user-server';
import { getOrCreateUserProfile } from '@/utils/data/user/profile/get-user-profile';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // check if the user accessing the profile page is logged in, if they are, show the default app sidebar
  const [user, profile] = await Promise.all([
    useUserServer(),
    getOrCreateUserProfile(),
  ]);

  return (
    <SidebarProvider>
      {user && (
        <AppSidebar
          user={user}
          profile={profile}
          todaysQuestion={null}
          hasAnsweredDailyQuestion={false}
        />
      )}
      {children}
    </SidebarProvider>
  );
}
