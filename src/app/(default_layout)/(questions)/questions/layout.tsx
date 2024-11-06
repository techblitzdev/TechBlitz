import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import { Separator } from '@/components/ui/separator';

const items = [
  {
    href: '/dashboard',
    label: 'Home',
  },
  {
    href: '/questions',
    label: 'Questions',
  },
];

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex flex-col gap-y-2">
        <BreadcrumbWithCustomSeparator items={items} />
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          All Questions
        </h1>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
