import BackToDashboard from '@/components/global/back-to-dashboard';
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
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex items-center w-full justify-between container">
            <BackToDashboard />
            <div className="flex flex-col gap-y-1 w-full justify-between">
              <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
                All questions
              </h1>
              <p className="font-ubuntu text-sm text-gray-300">
                Choose from a wide variety of questions, covering a range of
                topics.
              </p>
            </div>
            <div aria-hidden></div>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
