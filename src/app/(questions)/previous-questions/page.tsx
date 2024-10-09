import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import LoadingSpinner from '@/components/ui/loading';
import { Separator } from '@/components/ui/separator';

export default function PreviousQuestionsPage() {
  // get all of the previously asked questions
  // and display them in a list
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
      label: 'Previous Questions',
    },
  ];

  return (
    <>
      <div className="flex w-full justify-between items-center font-satoshi">
        <BreadcrumbWithCustomSeparator items={items} />
      </div>
      <Separator />
    </>
  );
}
