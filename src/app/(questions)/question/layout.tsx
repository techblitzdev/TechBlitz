import { Separator } from '@/components/ui/separator';
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const items = [
    {
      href: '/dashboard',
      label: 'Home',
    },
    {
      href: '/questions',
      label: 'Questions',
    },
    {
      href: '',
      label: 'Daily Question',
    },
  ];
  return (
    <div className="container text-white flex flex-col gap-y-4 py-12">
      <div className="flex w-full justify-between items-center font-satoshi">
        <BreadcrumbWithCustomSeparator items={items} />
        <span>0:00</span>
      </div>
      <Separator />
      {children}
    </div>
  );
}
