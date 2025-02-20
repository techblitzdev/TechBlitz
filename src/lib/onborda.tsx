import { Tour } from 'onborda/dist/types';

export const steps = (): Tour[] => [
  {
    tour: 'question-tour',
    steps: [
      {
        content:
          'Here you can find the question description. It will include the question, example usage, and any other relevant information.',
        selector: '#question-card-tabs-description',
        side: 'bottom-left',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: `Question description`,
      },
      {
        content:
          'You can find external websites (not affiliated with TechBlitz) that can help you with the question.',
        selector: '#question-card-tabs-resources',
        side: 'bottom-left',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Resources',
      },
      {
        content: (
          <>
            Here you can find the stats for the question. It will include the number of submissions,{' '}
            <br />
            the number of correct submissions, and the number of incorrect submissions.
          </>
        ),
        selector: '#question-card-tabs-stats',
        side: 'bottom',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Stats',
      },
      {
        content:
          'Here you can find the code editor. You can write your code here and run it against the test cases.',
        selector: '#code-snippet',
        side: 'left-bottom',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Code Editor',
      },
      {
        content: 'Here you can find the test cases for the question.',
        selector: '#test-cases',
        side: 'top-left',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Test Cases',
      },
      {
        content: 'Here you can start the timer, reset the question, and submit your answer.',
        selector: '#question-action-buttons',
        side: 'bottom',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Question Action Buttons',
      },
    ],
  },
];
