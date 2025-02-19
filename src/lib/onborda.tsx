import { UserRecord } from '@/types/User';
import { Tour } from 'onborda/dist/types';

export const steps = ({ user }: { user: UserRecord | null }): Tour[] => [
  {
    tour: 'question-tour',
    steps: [
      {
        content: (
          <>
            This is a quick run through of the different sections of the question page.
            <br />
            Ready to dive in?
          </>
        ),
        selector: '#code-snippet',
        side: 'left',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: `Welcome ${user?.username || 'Anonymous'}! We're excited to have you here.`,
      },
      {
        content: <>This is the second step of the tour.</>,
        selector: '#question-card-tabs',
        side: 'right',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'This is the second step of the tour.',
      },
    ],
  },
];
