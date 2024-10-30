import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import { Separator } from '@/components/ui/separator';

const items = [
  {
    href: '/dashboard',
    label: 'Home',
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
  },
  {
    href: '',
    label: 'Today',
  },
];

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4 py-12 navbar-height relative">
      <div className="flex flex-col gap-y-2">
        <BreadcrumbWithCustomSeparator items={items} />
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Today&apos;s Leaderboard
        </h1>
      </div>
      <Separator />
      {children}
    </div>
  );
}
