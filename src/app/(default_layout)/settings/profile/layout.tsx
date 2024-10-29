import BackToDashboard from '@/components/global/back-to-dashboard';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4 py-6 lg:py-12 navbar-height relative">
      <div className="flex items-center gap-x-2">
        <BackToDashboard />
        <h1>Account Settings</h1>
      </div>
      <Separator />
      {children}
    </div>
  );
}
