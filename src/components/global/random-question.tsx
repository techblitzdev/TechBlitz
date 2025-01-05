import { getRandomQuestion } from '@/actions/questions/get-random';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

/**
 * Component for redirecting the user to a random question.
 *
 * @returns
 */
export default async function RandomQuestion(opts: {
  currentQuestionUid: string;
}) {
  const { currentQuestionUid } = opts;

  return (
    <form
      action={async () => {
        'use server';
        const randomQuestionUid = await getRandomQuestion({
          currentQuestionUid,
        });
        redirect(`/question/${randomQuestionUid}`);
      }}
    >
      <Button variant="default" size="icon">
        <ShuffleIcon size={16} />
      </Button>
    </form>
  );
}
